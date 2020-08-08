import React from 'react'
import { Sidebar, Menu, Icon, Segment, Header } from 'semantic-ui-react'
import classes from '../../CSS/Shared/Sidebar.module.css'

const Navbar = (props) => (
  <Sidebar vertical icon='labeled' width='thin' visible as={Menu}>
    <Menu.Item as='a' fitted='vertically'>
      <Icon name='home' size='big' />
      Dashboard
    </Menu.Item>
  </Sidebar>
)

export default Navbar
