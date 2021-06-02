import React, { useState } from 'react'
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { getIsUserAuthenticated } from '../../Redux/Reducers/selectors'
import { setAuthentication } from '../../Redux/Actions/user'
import { signOutUser } from '../../Services/auth'
import { useSelector, useDispatch } from 'react-redux'
import classes from './navbar.module.css'

const Navbar = (props) => {
  const isAuthenticated = useSelector(getIsUserAuthenticated)
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const nonAuthRoutes = ['/', '/login', '/register', '/forgot']
  const [isOpen, setIsOpen] = useState(false)

  const toggleHandler = () => {
    setIsOpen(!isOpen)
  }

  const signOut = async () => {
    try {
      const result = await signOutUser()
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
      <>
      <div onPointerOver={() => setIsOpen(true)} onClick={toggleHandler} className={`${classes.toggle} ${isOpen ? classes.toggleSlideIn : classes.toggleSlideOut}`}>
        <Icon style={{ margin: '0 0 3px 0', padding: 0, color: 'white' }} name={isOpen ? 'arrow left' : 'arrow right'} />
      </div>
    <Sidebar
      animation='push'
      className={classes.sidebar}
      vertical
      icon='labeled'
      width='thin'
      visible={isOpen}
      as={Menu}
    >
      <h1 className={classes.navHeader}>Log2Win</h1>
      <Menu.Item>
        <NavLink activeClassName={classes.activeLink} active className={classes.link} to='/dashboard'>
          <Icon name='home' size='big' />
          <span>Dashboard</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink activeClassName={classes.activeLink} className={classes.link} to='/Calendar'>
          <Icon name='calendar' size='big' />
          Calendar
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink activeClassName={classes.activeLink} className={classes.link} to='/History'>
          <Icon name='history' size='big' />
          History
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink activeClassName={classes.activeLink} className={classes.link} to='/gear'>
          <Icon name='shopping bag' size='big' />
          Gear
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink activeClassName={classes.activeLink} className={classes.link} to='/settings'>
          <Icon name='setting' size='big' />
          Settings
        </NavLink>
      </Menu.Item>
      <Menu.Item onClick={() => signOut()}>
        <NavLink to='/login' className={classes.link}>
          <Icon name='sign out' size='big' />
          <span> Sign Out </span>
        </NavLink>
      </Menu.Item>
    </Sidebar>
      </>
      )
    : null
}

export default Navbar
