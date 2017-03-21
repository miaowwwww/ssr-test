import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect, Redirect } from 'react-router';
import { Provider } from 'react-redux';

// import '../css/reset.less';

import ClientRouter from './routers/clientIndex.js';
import configureStore from './configureStore.js';



const preloadedState = window.__INITIAL_STATE__

const store = configureStore(preloadedState);
render(
	<Provider store={store}>
			{ClientRouter}
	</Provider>,
	document.body.appendChild(document.getElementById('root'))
);


