import React, { useState } from 'react'
import BlankCard from './BlankCard'
import GearCard from './GearCard'
import { Modal, Button } from 'semantic-ui-react'
import { patchGear } from '../../Services/gear'
import { getCurrentDate, formatDateYYMMDD } from '../../Lib/time'
import classes from './gear.module.css'
import useGear from '../../Hooks/useGear'

const Gear = () => {
	const [gear, deleteGear] = useGear({})
	const [selectedGear, setSelectedGear] = useState({})
	const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
	const [isRetireModalOpen, setIsRetireModalOpen] = useState(false)

	const openRemoveHandler = (e, gearToRemove) => {
		setIsRemoveModalOpen(true)
		setSelectedGear(gearToRemove)
	}

	const openRetireHandler = (e, gearToRetire) => {
		setIsRetireModalOpen(true)
		setSelectedGear(gearToRetire)
	}

	const deleteGearHandler = async () => {
		try {
			const result = await deleteGear(selectedGear?.id)

			if (result) {
				setSelectedGear({})
				setIsRemoveModalOpen(false)
				window.location.reload()
			}
		} catch (error) {
			console.log(error)
		}
	}

	const retireGearHandler = async () => {
		try {
			const result = await patchGear(selectedGear?.id, { dateRetired: selectedGear?.dateRetired ? '' : formatDateYYMMDD(getCurrentDate()) })

			if (result) {
				setSelectedGear({})
				setIsRetireModalOpen(false)
				window.location.reload()
			}
		} catch (error) {
			console.log(error)
		}
	}

	const closeRemoveModalHandler = () => {
		setIsRemoveModalOpen(false)
	}

	const closeRetireModalHandler = () => {
		setIsRetireModalOpen(false)
	}

	return (
		<div className={classes.pageContainer}>
			<div className={classes.body}>
				{gear?.map((gear, i) => (
					<GearCard
						removeable
						editable
						retirable
						showOptions
						onRemove={openRemoveHandler}
						onRetire={openRetireHandler}
						key={i}
						gear={gear}
					/>
				))}
				<BlankCard />
			</div>

			<Modal onClose={closeRemoveModalHandler} size='mini' open={isRemoveModalOpen}>
				<Modal.Header>
					Are you sure you want to remove this gear?
				</Modal.Header>
				<Modal.Actions style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Button onClick={deleteGearHandler}>Remove</Button>
					<Button onClick={closeRemoveModalHandler}>Cancel</Button>
				</Modal.Actions>
			</Modal>
			<Modal onClose={closeRetireModalHandler} size='mini' open={isRetireModalOpen}>
				<Modal.Header>
					Are you sure you want to retire this gear?
				</Modal.Header>
				<Modal.Actions style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Button onClick={retireGearHandler}>Retire</Button>
					<Button onClick={closeRetireModalHandler}>Cancel</Button>
				</Modal.Actions>

			</Modal>
		</div>
	)
}
export default Gear
