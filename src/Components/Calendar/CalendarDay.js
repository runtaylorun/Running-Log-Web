/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { getUserMeasurementSystem } from '../../Redux/Reducers/selectors'
import { getMileageTotal } from '../../Lib/mileage'
import { distanceUnits, roundTo2 } from '../../Lib/conversions'
import RunContainer from './RunContainer'
import classes from './calendar.module.css'

const DayContainer = ({ day = '', month, year, nextMonth = false, weeklyBreakdown = false, activities }) => {
	const [showAddButton, setShowAddButton] = useState(false)
	const [runsModalOpen, setRunsModalOpen] = useState(false)
	const measurementSystem = useSelector(getUserMeasurementSystem)

	const mileageTotal = getMileageTotal(activities, measurementSystem)
	return (
		<div onMouseOut={() => setShowAddButton(false)} onMouseOver={() => setShowAddButton(true)} className={classes.dayContainer}>
			<div style={{ width: '100%' }}>
				<h4 style={{ color: nextMonth ? '#a1a1a1' : 'black', textAlign: 'left' }}>{day}</h4>
			</div>
			<div>
				<h2 style={{ color: nextMonth ? '#a1a1a1' : 'black', textAlign: 'left' }}>{`${mileageTotal} ${distanceUnits[measurementSystem]}`}</h2>
			</div>
			<div style={{ display: 'flex' }}>
				<Link style={{ visibility: showAddButton && !weeklyBreakdown && !nextMonth ? 'visible' : 'hidden' }} to={'/activityForm/0'}>
					<Button size='mini' icon='plus' style={{ marginBottom: 8, visibility: showAddButton && !weeklyBreakdown && !nextMonth ? 'visible' : 'hidden' }} />
				</Link>
				<Modal
					onClose={() => { setRunsModalOpen(false); setShowAddButton(false) }}
					onOpen={() => setRunsModalOpen(true)}
					open={runsModalOpen}
					trigger={<Button size='mini' icon='eye' style={{ marginBottom: 8, visibility: showAddButton && !weeklyBreakdown && !nextMonth ? 'visible' : 'hidden' }} />}
				>
					<Modal.Header style={{ textAlign: 'center' }}>{`Runs for ${month}-${day}-${year}`}</Modal.Header>
					<Modal.Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
						<div className={classes.runContainerHeader}>
							<h4>Activity Type</h4>
							<h4>Title</h4>
							<h4>Distance</h4>
							<h4>Actions</h4>
						</div>
						{activities?.map(activity => {
						  return <RunContainer
								activityId={activity.id}
								key={activity.id}
								title={activity.title}
								distance={roundTo2(activity.distance)}
								type={activity.type}
								unit={activity.distanceUnit}
						         />
						})

						}
						{activities && activities.length > 0 &&
						<div style={{ marginTop: 40, display: 'flex', justifyContent: 'center', width: '100%' }}>
							<h1>{`Daily Total: ${mileageTotal} ${distanceUnits[measurementSystem]}`}</h1>
						</div>}
					</Modal.Content>
				</Modal>
			</div>

		</div>
	)
}

export default DayContainer
