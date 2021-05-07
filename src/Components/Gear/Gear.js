import React, { useState } from 'react'
import BlankCard from './BlankCard'
import GearCard from './GearCard'
import { Modal, Button } from 'semantic-ui-react'
import classes from './gear.module.css'
import useGear from '../../Hooks/useGear'

const Gear = () => {
  const [gear, deleteGear] = useGear()
  const [selectedGear, setSelectedGear] = useState({})
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)

  const removeHandler = (e, gearToRemove) => {
    setIsRemoveModalOpen(true)
    setSelectedGear(gearToRemove)
  }

  const deleteGearHandler = async () => {
    deleteGear(selectedGear?.id)

    setSelectedGear({})
    setIsRemoveModalOpen(false)

    window.location.reload()
  }

  const closeModalHandler = () => {
    setIsRemoveModalOpen(false)
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
            onRemove={removeHandler}
            key={i}
            gear={gear} />
          ))}
        <BlankCard />
        </div>

        <Modal onClose={closeModalHandler} size='mini' open={isRemoveModalOpen}>
            <Modal.Header>
              Are you sure you want to remove this gear?
            </Modal.Header>
            <Modal.Actions style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={deleteGearHandler}>Remove</Button>
              <Button onClick={closeModalHandler}>Cancel</Button>
            </Modal.Actions>

        </Modal>
    </div>
  )
}
export default Gear
