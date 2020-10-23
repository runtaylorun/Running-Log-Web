import React from 'react'
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import { getIsUserAuthenticated } from '../../Redux/Reducers/selectors'
import { setUser } from '../../Redux/Actions/user'
import { signOut as signOutCall } from '../../Services/auth'
import { useSelector, useDispatch } from 'react-redux'
import classes from '../../CSS/Shared/Sidebar.module.css'

const Navbar = (props) => {
  const isAuthenticated = useSelector(getIsUserAuthenticated)
  const dispatch = useDispatch()
  const history = useHistory()

  const signOut = async () => {
    try {
      const result = await signOutCall()
      if (result) {
        sessionStorage.clear()
        dispatch(setUser({ isAuthenticated: false, userId: 0 }))
        history.push('/')
      }
    } catch (error) {
      console.log(error)
    }
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
      <h1 style={{color: '#1F6FDD'}}>Log2Win</h1>
      <Menu.Item as='a'>
        <Icon style={{color: '#24182D'}} name='home' size='big' />
        <Link style={{color: '#24182D'}} to='/dashboard'>Dashboard</Link>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon style={{color: '#24182D'}} name='calendar' size='big' />
        <Link style={{color: '#24182D'}} to='/Calendar'>Calendar</Link>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon style={{color: '#24182D'}} name='chart bar' size='big' />
        <Link style={{color: '#24182D'}} to='/statistics'>Statistics</Link>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon style={{color: '#24182D'}} name='shopping bag' size='big' />
        <Link style={{color: '#24182D'}} to='/gear'>Gear</Link>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon style={{color: '#24182D'}} name='setting' size='big' />
        <Link style={{color: '#24182D'}} to='/settings'>Settings</Link>
      </Menu.Item>
      <Menu.Item onClick={() => signOut()} as='a'>
        <Icon style={{color: '#24182D'}} name='sign out' size='big' />
        <Link style={{color: '#24182D'}}>
					Sign Out
        </Link>
      </Menu.Item>
    </Sidebar>
  ) : null
}

export default Navbar
