import React from 'react'
import Calendar from './Calendar'

const CalendarPage = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 0,
        height: '100%'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '20%'
        }}
      >
        <a href='#'>Monthly</a>
        <a href='#'>Weekly</a>
        <a href='#'>Daily</a>
      </div>
      <Calendar />
    </div>
  )
}

export default CalendarPage
