import React from 'react'
import { useSelector } from 'react-redux'
import { getIsUserAuthenticated } from './Redux/Reducers/selectors'
import Navbar from './Components/Shared/Navbar'
import CalendarPage from './Components/Dashboard/Calendar/CalendarPage'
import Login from './Components/Login/Login'
import ActivityForm from './Components/ActivityForm/ActivityForm'
import StatisticsPage from './Components/Statistics/StatisticsPage'
import Gear from './Components/Gear/Gear'
import Settings from './Components/Settings/Settings'
import Dashboard from './Components/Dashboard/Dashboard'
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css'

function App () {
  const isUserAuthenticated = useSelector(getIsUserAuthenticated)
  console.log(isUserAuthenticated)

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isUserAuthenticated || sessionStorage.getItem('id') ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location }
              }}
            />
          )
        }
      />
    )
  }

  return (
    <>
      <Navbar />
      <Switch>
        <Route component={Login} exact path='/' />
        <PrivateRoute exact path='/dashboard'>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path='/calendar' >
          <CalendarPage />
        </PrivateRoute>
        <PrivateRoute exact path='/statistics'>
          <StatisticsPage />
        </PrivateRoute>
        <PrivateRoute exact path='/gear'>
          <Gear />
        </PrivateRoute>
        <PrivateRoute exact path='/settings'>
          <Settings />
        </PrivateRoute>
        <PrivateRoute exact path='/activityForm/:day/:month/:year'>
          <ActivityForm />
        </PrivateRoute>
      </Switch>
    </>
  )
}

export default App
