import React from 'react'

const DataSlot = ({ label, data }) => {
  return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'flex-start' }}>
            <p style={{ fontSize: '12px', margin: 0, textAlign: 'center' }}>{label}</p>
            <h2 style={{ margin: 0, fontSize: '32px', fontWeight: 400 }}>{data}</h2>
        </div>
  )
}

export default DataSlot
