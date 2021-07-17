import React from 'react'
import classes from './activity.module.css'

const DataSlot = ({ label, data }) => {
  return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'flex-start' }}>
            <p className={classes.dataSlotHeader}>{label}</p>
            <h2 className={classes.dataSlotText}>{data}</h2>
        </div>
  )
}

export default DataSlot
