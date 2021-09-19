import React from 'react'
import classes from './landing.module.css'

const Landing = () => {
	return (
		<div className={'h-full bg-blue-500 flex items-center justify-center flex-col'}>
			<h2 className={classes.appName}>Fitness Guardian</h2>
			<div className={'flex flex-col items-center justify-evenly text-white h-96 w-3/4 sm:w-4/5 md:w-3/5 lg:w-2/5 xl:1/5'}>
				<div>
					<h2 className='font-normal text-center text-5xl sm:text-6xl' >Get Moving!</h2>
					<p className=' w-full text-center mt-5 text-md sm:text-lg'>The online tool that provides you with everything you need to track your activities and reach beyond your limits</p>
				</div>
				<div className={'flex justify-evenly w-full'}>
					<button className={classes.transparentBtn}><a className={classes.whiteLink} href='/login'>Login</a></button>
					<button className={classes.transparentBtn}><a className={classes.whiteLink} href='/register'>Sign Up</a></button>
				</div>
			</div>

		</div>
	)
}

export default Landing
