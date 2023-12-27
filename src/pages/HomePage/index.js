import React from 'react';
import styles from './index.module.css'
import { AnimationComponent } from "../../components/animationComponent/animation";

const Home = () => {
  return (
    <div className={styles.RiveContainer}>
      <AnimationComponent/>
    </div>
  );
};

export default Home;