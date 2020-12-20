import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import classes from './forgot.module.css';

const Forgot = () => {   
      const [formData, setFormData] = useState({})
    
      const handleValueChange = (e) => {
        setFormData({
          ...formData,
          [e.currentTarget.name]: e.currentTarget.value
        })
      }
    
      return (
        <div className={classes.page}>
          <div className={classes.card}>
            <div className={classes.cardHeader}>
              <h2>Forgot Your Password?</h2>
              <p>Enter you email and we will contact you if your account exists</p>
            </div>
            <div className={classes.cardBody}>
              <form>
                <div className={classes.inputContainer}>
                  <label>Email</label>
                  <input onChange={handleValueChange} type='text' name='email' />
                </div>
                <div className={classes.formSubmitContainer}>
                  <button>Submit Request</button>
                </div>
              </form>
            </div>
            <div className={classes.cardFooter}>
              <Link style={{ color: 'black' }} to='/login'>Sign In</Link>
              <Link style={{ color: 'black', marginLeft: 10 }} to='/register'>Create Account</Link>
            </div>
          </div>
        </div>
      );
    };
    
export default Forgot
