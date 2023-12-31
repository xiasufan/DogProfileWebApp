import React, { useState } from 'react';
import LoginForm from '../../components/loginComponent';
import {AnimationComponent} from '../../components/animationComponent';
import styles from './index.module.css';

const Home = () => {

  return (
    <div className={styles.homeContainer}>
      <div className={styles.loginContainer}>
        
        <LoginForm />
      </div>
      <div className={styles.RiveContainer}>
        <AnimationComponent />
      </div>
    </div>
  );
};

export default Home;
