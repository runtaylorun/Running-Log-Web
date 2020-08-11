import React from 'react'
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getIsUserAuthenticated } from '../../Redux/Reducers/selectors'
import { setUser } from '../../Redux/Actions/user'
import { useSelector, useDispatch } from 'react-redux'
import classes from '../../CSS/Shared/Sidebar.module.css'

const Navbar = (props) => {
  const isAuthenticated = useSelector(getIsUserAuthenticated)
  const dispatch = useDispatch()

  const signOut = () => {
    dispatch(setUser({ isAuthenticated: false }))
  }

  return isAuthenticated ? (
    <Sidebar
      style={{
        display: 'inline',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        height: '100%',
        flexGrow: 1,
        float: 'left'
      }}
      vertical
      icon='labeled'
      width='thin'
      visible
      as={Menu}
    >
      <Menu.Item as='a'>
        <Icon name='home' size='big' />
        <Link to='/dashboard'>Dashboard</Link>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='calendar' size='big' />
        <Link to='/Calendar'>Calendar</Link>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='chart bar' size='big' />
        <Link to='/statistics'>Statistics</Link>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='shopping bag' size='big' />
        <Link to='/gear'>Gear</Link>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='setting' size='big' />
        <Link to='/settings'>Settings</Link>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='sign out' size='big' />
        <Link onClick={() => signOut()} to='/'>
					Sign Out
        </Link>
      </Menu.Item>
    </Sidebar>
  ) : null
}

export default Navbar
