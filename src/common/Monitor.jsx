import React from 'react';

// Styles
import monitor from '../styles/Monitor.module.css';

// Components
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Pages
import { Login } from '@/pages/login';

export const Monitor = () => {
	return (
		<>
			<div className={monitor.monitorContainer}>
				<div className={monitor.monitorScreen}>
					{/* <Router>
							<Routes>
								<Route path="/about" element={<h1>About</h1>} />
								<Route path="/" element={} />
							</Routes>
						</Router> */}
					<Login />
				</div>
			</div>
		</>
	);
};
