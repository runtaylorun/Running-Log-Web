import { white } from 'colorette'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const Landing = () => {
  return (
        <div style={{ height: '100%', backgroundColor: '#9812ff', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div style={{ width: 512, height: 512, backgroundColor: '#d400ff', borderRadius: 8 }}>
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', left: 15, top: 15, width: 512, height: 512, backgroundColor: 'white', borderRadius: 8, padding: 5 }}>
                    <h2>Start Logging Today!</h2>
                    <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                        <Button><Link to='/login'>Login</Link></Button>
                        <Button><Link to='/register'>Sign Up</Link></Button>
                    </div>
                </div>
            </div>
            <div>
                <h1>LogX</h1>
            </div>

        </div>
  )
}

export default Landing
