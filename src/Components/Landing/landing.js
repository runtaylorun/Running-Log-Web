import React from 'react'
import classes from './landing.module.css'

const Landing = () => {
  return (
		<div className={classes.page}>
			<h2 className={classes.appName}>Fitness Guardian</h2>
			<div className={classes.landingContainer}>
				<div>
					<h2 className={classes.phrase}>Get Moving!</h2>
					<p className={classes.shortStatement}>The online tool that provides you with everything you need to track your activities and reach beyond your limits</p>
				</div>
				<div className={classes.buttonContainer}>
					<button className={classes.button}><a className={classes.link} href='/login'>Login</a></button>
					<button className={classes.button}><a className={classes.link} href='/register'>Sign Up</a></button>
				</div>
			</div>

		</div>
  )
}

export default Landing
