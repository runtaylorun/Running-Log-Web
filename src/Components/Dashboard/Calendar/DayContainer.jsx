import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'semantic-ui-react'
import Moment from 'moment'
import classes from '../../../CSS/Dashboard/Calendar.module.css'

const DayContainer = ({ day = '', month, year, nextMonth = false }) => {
  const [showAddButton, setShowAddButton] = useState(false)
  const [runsModalOpen, setRunsModalOpen] = useState(false)

  return (
    <div
      onMouseOut={() => setShowAddButton(false)}
      onMouseOver={() => setShowAddButton(true)}
      className={classes.dayContainer}
    >
      <div style={{ width: '100%' }}>
        <h4 style={{ color: nextMonth ? '#a1a1a1' : 'black', textAlign: 'left' }}>{day}</h4>
      </div>
      <div>
        <h2 style={{ color: nextMonth ? '#a1a1a1' : 'black', textAlign: 'left' }}>9 mi</h2>
      </div>
      <div style={{ display: 'flex' }}>
        <Link to={`/activityForm/${day}/${month}/${year}`}>
          <Button size='tiny' icon='plus' style={{ marginBottom: 8, visibility: showAddButton ? 'visible' : 'hidden' }} />
        </Link>
        <Modal
          onClose={() => setRunsModalOpen(false)}
          onOpen={() => setRunsModalOpen(true)}
          open={runsModalOpen}
          trigger={<Button size='tiny' icon='write' style={{ marginBottom: 8, visibility: showAddButton ? 'visible' : 'hidden' }} />}
        >
          <Modal.Header style={{ textAlign: 'center' }}>Runs for 08/27/2020</Modal.Header>
        </Modal>
      </div>

    </div>
  )
}

export default DayContainer
