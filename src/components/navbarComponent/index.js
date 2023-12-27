import React from 'react';
import styles from './index.module.css';
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
      <nav>
        <h1 style={{ color: 'white', fontSize: '2rem' }}>宠物记录器</h1>
        <div>
        <ul className={styles.navbar} >
          <li><NavLink to="/" >
            主页
          </NavLink></li>
  
          <li><NavLink to="/stat" >
            属性
          </NavLink></li>
  
          <li><NavLink to="/friends" >
            好友
          </NavLink></li>
  
          <li><NavLink to="/history" >
            活动记录
          </NavLink></li>
        </ul>
        </div>
      </nav>
    );
  }