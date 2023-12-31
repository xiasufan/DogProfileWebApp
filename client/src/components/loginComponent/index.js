import React, { useState } from 'react';
import styles from './index.module.css';
import { useNavigate } from "react-router-dom";
import Axios from "axios";

Axios.defaults.withCredentials = true;

const apiUrl = process.env.REACT_APP_API_URL;

// Design from https://codepen.io/dineshbatchu/pen/eYZmRRL
function Form({ option }) {

    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
  
    const [username, setUsername] = useState("");

    const register = () => {
        Axios.post(apiUrl + "/register", {
          username: usernameReg,
          password: passwordReg,
        }).then((response) => {
          if (response.data.message) {
            alert(response.data.message);
            navigate(0);
          } else {
  
            navigate(0);
          }
        });
      };
    
      const login = () => {
        Axios.post(apiUrl + "/login", {
          username: username,
          password: password,
        }).then((response) => {
          if (response.data.message) {
            alert(response.data.message);
          } else {
            navigate(0);
          }
        });
      };

  
    const handlePasswordChange = (event) => {
        if(option===2){
      setPasswordReg(event.target.value);}
      else{setPassword(event.target.value)}
    };
  
    const handleRepeatPasswordChange = (event) => {
      setRepeatPassword(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if(option===1){
        login();
      }
      // Check if passwords match
      else if(option===2){
        if (passwordReg !== repeatPassword) {
            setPasswordError('* Passwords do not match');
            // You might also want to clear the password and repeatPassword state here
        } else {
            // Passwords match, continue with your form submission logic
            setPasswordError('');
            // Add your form submission logic here
            register();
        }
    }
    };
  
    return (
      <form className={styles['account-form']} autoComplete="off" onSubmit={handleSubmit}>
        <div className={`${styles['account-form-fields']} ${styles[option === 1 ? 'sign-in' : (option === 2 ? 'sign-up' : 'forgot')]}`}>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='E-mail'
            required
            onChange={(e) => {
                option===2?setUsernameReg(e.target.value):setUsername(e.target.value);
              }}
          />
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Password'
            onChange={handlePasswordChange}
            required={option === 1 || option === 2}
            disabled={option === 3}
          />
          <input
            id='repeat-password'
            name='repeat-password'
            type='password'
            placeholder='Repeat password'
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
            required={option === 2}
            disabled={option === 1 || option === 3}
          />
        </div>
        {passwordError && <div className={styles['password-error']}>{passwordError}</div>}
        <button className={styles['btn-submit-form'] } type='submit' style={{ backgroundColor: option===3?'grey':null }}>
          {option === 1 ? 'Sign in' : (option === 2 ? 'Sign up' : 'Reset password')}
        </button>
      </form>
    );
  }

function LoginForm() {
  const [option, setOption] = React.useState(1);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={`${styles['header-headings']} ${styles[option === 1 ? 'sign-in' : (option === 2 ? 'sign-up' : 'forgot')]}`}>
          <span>Sign in to your account</span>
          <span>Create an account</span>
          <span>Reset your password</span>
        </div>
      </header>

      <ul className={styles.options}>
        <li className={`${styles[option === 1 ? 'active' : '']}`} onClick={() => setOption(1)}>
          Sign in
        </li>
        <li className={`${styles[option === 2 ? 'active' : '']}`} onClick={() => setOption(2)}>
          Sign up
        </li>
        <li className={`${styles[option === 3 ? 'active' : '']}`} onClick={() => setOption(3)}>
          Forgot
        </li>
      </ul>
      <Form option={option} />
    </div>
  );
}

export default LoginForm;
