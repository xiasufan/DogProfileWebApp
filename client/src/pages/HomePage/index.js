import React, { useState,useEffect} from 'react';
import LoginForm from '../../components/loginComponent';
import {AnimationComponent} from '../../components/animationComponent';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Main from '../../components/mainComponent'

import { useAuth } from '../../components/checkLoginComponent';


const Home = () => {

  const { loginName, loginRole, setLoginName, setLoginRole } = useAuth();
  const navigate=useNavigate()
  const logout = () => {
    Axios.get(process.env.REACT_APP_API_URL +"/logout").then((response) => {
        
});navigate('/');
navigate(0)
setLoginName('')
  };

//   const cookietest = () => {
//     Axios.get(process.env.REACT_APP_API_URL +"/test-cookie").then((response) => {
//         console.log(response)
// })
//   };
  return (
    <div className={styles.homeContainer}>
      {/*<button onClick={cookietest} style={{ zIndex: 9999 }}>test cookie</button>*/}
      <ToastContainer
    position="top-right"
    autoClose={100}
    limit={3}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
    <h1 style={{position: 'absolute',top: '8.5vh',left: 'auto',fontSize:'1.5rem',color:'grey'}}>Support by creating an account 🚀</h1>
      {loginName?
      <div>
        <Main loginName={loginName}/>
        <button className={styles.logout} onClick={logout}>logout→</button>
      </div>:
      <div className={styles.loginContainer}>
      <LoginForm />
    </div>
      }
      <div className={styles.RiveContainer}>

        <AnimationComponent />
      </div>
    </div>
  );
};

export default Home;
