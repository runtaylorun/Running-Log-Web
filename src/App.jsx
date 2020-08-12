import React from 'react';
import Navbar from './Components/Shared/Navbar';
import CalendarPage from './Components/Dashboard/Calendar/CalendarPage';
import Login from './Components/Login/Login';
import ActivityForm from './Components/ActivityForm/ActivityForm';
import StatisticsPage from './Components/Statistics/StatisticsPage';
import Gear from './Components/Gear/Gear';
import Settings from './Components/Settings/Settings';
import Dashboard from './Components/Dashboard/Calendar/Dashboard';
import { Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<>
			<Navbar />
			<Switch>
				<Route component={Login} exact path='/' />
				<Route component={Dashboard} exact path='/dashboard' />
				<Route component={CalendarPage} exact path='/calendar' />
				<Route component={StatisticsPage} exact path='/statistics' />
				<Route component={Gear} exact path='/gear' />
				<Route component={Settings} exact path='/settings' />
				<Route component={ActivityForm} exact path='/activityForm/:day/:month/:year' />
			</Switch>
		</>
	);
}

export default App;
