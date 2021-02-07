import React from 'react'
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { getIsUserAuthenticated } from '../../Redux/Reducers/selectors'
import { setAuthentication } from '../../Redux/Actions/user'
import { signOut as signOutCall } from '../../Services/auth'
import { useSelector, useDispatch } from 'react-redux'

const Navbar = (props) => {
  const isAuthenticated = useSelector(getIsUserAuthenticated)
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const nonAuthRoutes = ['/', '/login', '/register', '/forgot']
  const linkStyle = { color: '#24182D' }

  const signOut = async () => {
    try {
      const result = await signOutCall()
      if (result) {
        dispatch(setAuthentication(false))
        history.push('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return isAuthenticated && !nonAuthRoutes.includes(location.pathname)
    ? (
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
      <h1 style={{ color: '#1F6FDD' }}>Log2Win</h1>
      <Menu.Item as='a'>
        <Icon style={linkStyle} name='home' size='big' />
        <Link style={linkStyle} to='/dashboard'>Dashboard</Link>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon style={linkStyle} name='calendar' size='big' />
        <Link style={linkStyle} to='/Calendar'>Calendar</Link>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon style={linkStyle} name='history' size='big' />
        <Link style={linkStyle} to='/History'>History</Link>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon style={linkStyle} name='shopping bag' size='big' />
        <Link style={linkStyle} to='/gear'>Gear</Link>
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon style={linkStyle} name='setting' size='big' />
        <Link style={linkStyle} to='/settings'>Settings</Link>
      </Menu.Item>
      <Menu.Item onClick={() => signOut()} as='a'>
        <Icon style={linkStyle} name='sign out' size='big' />
        <Link style={linkStyle}>
          Sign Out
        </Link>
      </Menu.Item>
    </Sidebar>
      )
    : null
}

export default Navbar
