import React from 'react'
import { formatDateMMDD } from '../../Lib/time'
import { shortenString } from '../../Lib/string'
import classes from './dashboard.module.css'

const GearSummary = ({ gear }) => {
  return (
        <div className={classes.gearContainer}>
            <h2 style={{ fontWeight: 400 }}>Most Recent Gear</h2>
            <table className={classes.gearTable}>
                <thead>
                    <tr>
                        <th>Gear</th>
                        <th>Miles</th>
                        <th>Last Use</th>
                    </tr>
                </thead>
                <tbody>
                    {gear?.map(gear => (
                        <tr key={gear.id}>
                            <td>{shortenString(`${gear.brand} ${gear.model}`)}</td>
                            <td>{gear.miles}</td>
                            <td>{formatDateMMDD(gear.dateAdded)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}

export default GearSummary
