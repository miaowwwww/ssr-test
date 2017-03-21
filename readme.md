# SSR总结
step 1 
	服务端发送url请求
	后台创建一个store，获取preloadState，
	配合react-dom/server的renderToString把react组件变成字符串
	返回一个已经带有react组件元素的html页面（并且该页面中带有bundle.js)
	虽然页面完成了，可是bundle.js下载完成还是会再一次执行ReactDOM.render()，
	因此我们把preloadState也一起发给客户端，并且把preloadState，传入客户端要执行的createStore中。
	因为服务端渲染的html，跟客户端新生的react组件是相同的state，相同的view，所以是相同的DOM
	（好处，大大减少了性能负担，因为不需要获取数据了，处理速度更快，并且处理结束之前已经看到页面了）

redux 部分
	在每次请求都要创建一个store，得到一个preloadState，然后需要把preloaderState是用来给客户端用的。

react-router 部分
	使用match获取{routes, location} 联系
		routes是配置好的路由系统，注意不包括Router，只有Route
		location是请求的url路径 req.url
	然后使用<RouterContext {...props} />, 创建一个完整的路由上下文（官网说是RoutingContext，去死吧）