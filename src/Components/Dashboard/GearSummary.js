import React from 'react'
import classes from './dashboard.module.css'

const GearSummary = () => {
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
                    <tr>
                        <td>Nike Pegasus 37</td>
                        <td>129</td>
                        <td>01/29/2021</td>
                    </tr>
                    <tr>
                        <td>Brooks Ghost</td>
                        <td>250</td>
                        <td>01/24/2021</td>
                    </tr>
                    <tr>
                        <td>Nike Pegasus 37</td>
                        <td>159</td>
                        <td>01/05/2021</td>
                    </tr>
                    <tr>
                        <td>Saucony Kinvara 11</td>
                        <td>55</td>
                        <td>02/03/2021</td>
                    </tr>
                    <tr>
                        <td>Saucony Fastswitch</td>
                        <td>75</td>
                        <td>02/03/2021</td>
                    </tr>
                </tbody>
            </table>
        </div>
  )
}

export default GearSummary
