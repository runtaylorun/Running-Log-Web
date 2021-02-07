import React from 'react'
import { Loader } from 'semantic-ui-react'

const PageLoader = ({ label }) => {
  return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader active inline='centered' size='large'>{label}</Loader>
        </div>
  )
}

export default PageLoader
