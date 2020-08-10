import React from 'react'
import Navbar from './Components/Shared/Navbar'
import CalendarPage from './Components/Dashboard/CalendarPage'
import Login from './Components/Login/Login'
import { Switch, Route } from 'react-router-dom'
import './App.css'

function App () {
  return (
    <>
      <Navbar />
      <Switch>
        <Route component={Login} exact path='/' />
        <Route component={CalendarPage} exact path='/calendar' />
      </Switch>
    </>
  )
}

export default App
