import React from 'react';
import PhaserGame from '../../components/gameComponent';
import styles from './index.module.css';
const Playground = () => {
  return (
      <div className={styles.canvasContainer}><PhaserGame /></div>
  );
};

export default Playground;