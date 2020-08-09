import React from 'react'
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import classes from '../../CSS/Shared/Sidebar.module.css'

const Navbar = (props) => (
  <Sidebar
    style={{
      display: 'inline',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'static',
      height: '100vh',
      float: 'left'
    }}
    vertical
    icon='labeled'
    width='thin'
    visible
    as={Menu}
  >
    <Menu.Item as='a'>
      <Icon name='home' size='big' /> Dashboard
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='calendar' size='big' />
      <Link to='/Calendar'>Calendar</Link>
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='chart bar' size='big' /> Statistics
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='shopping bag' size='big' /> Gear
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='setting' size='big' /> Settings
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='sign out' size='big' />
      <Link to='/'>Sign Out</Link>
    </Menu.Item>
  </Sidebar>
)

export default Navbar
