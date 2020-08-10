import React, { useContext } from 'react';
import Navbar from './Components/Shared/Navbar';
import CalendarPage from './Components/Dashboard/CalendarPage';
import Login from './Components/Login/Login';
import { Switch, Route } from 'react-router-dom';
import { UserProvider } from './Components/Context/UserContext';
import './App.css';

function App() {
	const user = { authenticated: false };

	return (
		<>
			<UserProvider value={user}>
				<Navbar />
				<Switch>
					<Route component={Login} exact path='/' />
					<Route component={CalendarPage} exact path='/calendar' />
				</Switch>
			</UserProvider>
		</>
	);
}

export default App;
