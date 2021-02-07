import React from 'react'

const ErrorBar = ({ message, setError}) => {

  const clickHandler = () => {
    setError('')
  }
  return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', backgroundColor: '#ff7e75', borderRadius: 5, alignItems: 'center', padding: 10 }}>
            <p style={{ margin: 0 }}>{message}</p>
            <p onClick={clickHandler} style={{ cursor: 'pointer' }}>X</p>
        </div>
  )
}

export default ErrorBar
