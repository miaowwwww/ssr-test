import { Router } from 'react-router';
import routers from './index.js';
import History from './history.js';
import React from 'react';

const configClientRouter = () => {
	return (
		<Router history={History}>
			{routers}
		</Router>
	)
}

export default configClientRouter();