import React from 'react'
import Navbar from './Components/Shared/Navbar'
import Dashboard from './Components/Dashboard/Dashboard'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Dashboard />
      </div>
    </>
  )
}

export default App
