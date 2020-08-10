import React, { useContext } from 'react';
import classes from '../../CSS/Login/Login.module.css';
import UserContext from '../Context/UserContext';
import { Link } from 'react-router-dom';

const Login = () => {
	const user = useContext(UserContext);
	return (
		<div className={classes.loginPage}>
			<div className={classes.loginContainer}>
				<h2>Login</h2>
				<form>
					<div className={classes.inputContainer}>
						<label>Email</label>
						<input type='text' name='email' />
					</div>
					<div className={classes.inputContainer}>
						<label>Password</label>
						<input type='password' name='password' />
					</div>
					<div>
						<button>Sign In</button>
					</div>
					<div>
						<Link to='/register'>Not Registered?</Link>
						<Link to='/forgot'>Forgot Password?</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;