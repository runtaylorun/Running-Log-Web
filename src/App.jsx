import React from 'react';
import Navbar from './Components/Shared/Navbar';
import Dashboard from './Components/Dashboard/Dashboard';
import { Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<>
			<Navbar />
			<Switch>
				<Route component={Dashboard} exact path='/dashboard' />
				<Route component={Dashboard} exact path='/calendar' />
			</Switch>
		</>
	);
}

export default App;
