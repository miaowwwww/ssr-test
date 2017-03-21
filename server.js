import path from 'path';
import Express from 'express';
import React from 'react';
// import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import counterApp from './src/reducers';
// import App from './src/components/App';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import rootRouter from './src/routers/index.js';
import configureStore from './src/configureStore.js';

const app = Express();
const host = '127.0.0.1';
const port = 3000;

// 每当收到请求时都会触发
// app.use(Express.static(path.join(__dirname,'dist')))
app.use(Express.static('dist', {index: false}))
// app.use(handleRender);

app.use((req,res) => { 
  console.log(req.url)
	match({routes:rootRouter,location:req.url},(err,redirect,props)=>{
		if(err){
			res.status(500).send(err.message)
		}else if(redirect){
			res.redirect(redirect.pathname + redirect.search)
		}else if(props){
      handleRender(props, res);
		}else{
			res.status(404).send('Not Found')
		}
	})
})


function handleRender(props, res) {

  // 创建新的 Redux store 实例
  const store = configureStore({});

  // 把组件渲染成字符串
  const html = renderToString(
    <Provider store={store}>
      <RouterContext {...props} />
    </Provider>
  )

  // 从 store 中获得初始 state
  const preloadedState = store.getState();

  // 把渲染后的页面内容发送给客户端
  res.send(renderFullPage(html, preloadedState));
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux ssr</title>
        <link href="/css/style.css" rel="stylesheet"></head>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="/js/vendor.bundle.js"></script>
        <script src="/js/app.bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port, host, () => {
  console.log(`server open in http://${host}:${port}`)
} );


