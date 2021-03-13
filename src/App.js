import React, { useEffect, useState } from 'react'
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
import PageLoader from './Components/Shared/PageLoader'
import Reset from './Components/Auth/reset'
import { setAuthentication } from './Redux/Actions/user'
import ActivityForm from './Components/ActivityForm/ActivityForm'
import { checkAuthentication } from './Services/auth'
import GearForm from './Components/Gear/GearForm'
import Gear from './Components/Gear/Gear'
import Settings from './Components/Settings/Settings'
import Dashboard from './Components/Dashboard/Dashboard'
import { Switch, Route, Redirect } from 'react-router-dom'

function App () {
  const isUserAuthenticated = useSelector(getIsUserAuthenticated)
  const [checkingAuthentication, setCheckingAuthentication] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const checkIfAuthenticated = async () => {
      try {
        const result = await checkAuthentication()

        dispatch(setAuthentication(result?.data))
        setCheckingAuthentication(false)
      } catch (error) {
        console.log('Error authenticating')
      }
    }

    checkIfAuthenticated()
  }, [])

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      checkingAuthentication ? <PageLoader label='Authenticating' />
        : <Route
        {...rest}
        render={({ location }) =>
          isUserAuthenticated
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
        <PrivateRoute path='/dashboard'>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path='/calendar' >
          <CalendarPage />
        </PrivateRoute>
        <PrivateRoute path='/history'>
          <History />
        </PrivateRoute>
        <PrivateRoute path='/gear'>
          <Gear />
        </PrivateRoute>
        <PrivateRoute path='/settings'>
          <Settings />
        </PrivateRoute>
        <PrivateRoute path='/gear/gearForm/:gearId'>
          <GearForm />
        </PrivateRoute>
        <PrivateRoute path='/activityView/:activityId'>
          <ActivityView />
        </PrivateRoute>
        <PrivateRoute path='/activityForm/:month/:day/:year'>
          <ActivityForm />
        </PrivateRoute>
        <PrivateRoute path='/activityForm/:activityId'>
          <ActivityForm />
        </PrivateRoute>

        <Route component={Landing} exact path='/' />
        <Route component={Login} path='/login' />
        <Route component={Register} path='/register' />
        <Route component={Forgot} path='/forgot' />
        <Route component={Reset} path='/forgot/:token' />
      </Switch>
    </>
  )
}

export default App
