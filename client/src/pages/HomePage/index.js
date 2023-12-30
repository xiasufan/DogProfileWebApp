import React from 'react';
import styles from './index.module.css'
import { AnimationComponent } from "../../components/animationComponent";

const Home = () => {
  return (
    <div className={styles.RiveContainer}>
      <div className={styles.textContainer}>
        <h2>Click to pet ↓</h2>
      </div>
      <AnimationComponent />
    </div>
  );
};

export default Home;