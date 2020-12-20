import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getIsUserAuthenticated } from './Redux/Reducers/selectors'
import Landing from './Components/Landing/landing'
import Navbar from './Components/Shared/Navbar'
import CalendarPage from './Components/Calendar/CalendarPage'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Forgot from './Components/Forgot/Forgot'
import History from './Components/History/History'
import ActivityView from './Components/Activity/ActivityView'
import { setUser } from './Redux/Actions/user'
import ActivityForm from './Components/ActivityForm/ActivityForm'
import GearForm from './Components/Gear/GearForm'
import Gear from './Components/Gear/Gear'
import Settings from './Components/Settings/Settings'
import Dashboard from './Components/Dashboard/Dashboard'
import { Switch, Route, Redirect } from 'react-router-dom'

function App () {
  const isUserAuthenticated = useSelector(getIsUserAuthenticated)
  const dispatch = useDispatch()

  useEffect(() => {
    if (sessionStorage.getItem('id')) {
      dispatch(setUser({ isAuthenticated: true, userId: sessionStorage.getItem('id') }))
    }
  }, [])

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isUserAuthenticated || sessionStorage.getItem('id')
            ? (
                children
              )
            : (
            <Redirect
              to={{
                pathname: '/login',
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
        <Route component={Landing} exact path='/' />
        <Route component={Login} exact path='/login' />
        <Route component={Register} exact path='/register' />
        <Route component={Forgot} exact path='/forgot' />
        <PrivateRoute exact path='/dashboard'>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path='/calendar' >
          <CalendarPage />
        </PrivateRoute>
        <PrivateRoute exact path='/history'>
          <History />
        </PrivateRoute>
        <PrivateRoute exact path='/gear'>
          <Gear />
        </PrivateRoute>
        <PrivateRoute exact path='/settings'>
          <Settings />
        </PrivateRoute>
        <PrivateRoute exact path='/gear/gearForm/:gearId'>
          <GearForm />
        </PrivateRoute>
        <PrivateRoute exact path='/activityView/:activityId'>
          <ActivityView />
        </PrivateRoute>
        <PrivateRoute exact path='/activityForm/:activityId'>
          <ActivityForm />
        </PrivateRoute>
        <PrivateRoute exact path='/activityForm/:day/:month/:year'>
          <ActivityForm />
        </PrivateRoute>
      </Switch>
    </>
  )
}

export default App
