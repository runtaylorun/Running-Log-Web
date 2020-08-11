import React from 'react';
import Navbar from './Components/Shared/Navbar';
import CalendarPage from './Components/Dashboard/CalendarPage';
import Login from './Components/Login/Login';
import ActivityForm from './Components/ActivityForm/ActivityForm';
import { Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<>
			<Navbar />
			<Switch>
				<Route component={Login} exact path='/' />
				<Route component={CalendarPage} exact path='/calendar' />
				<Route component={ActivityForm} exact path='/activityForm' />
			</Switch>
		</>
	);
}

export default App;
