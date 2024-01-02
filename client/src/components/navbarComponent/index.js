import React from 'react';
import styles from './index.module.css';
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
      <nav>
        <h1 style={{ color: 'white', fontSize: '2rem' }}>Welcome</h1>
        <div>
        <ul className={styles.navbar} >
          <li><NavLink to="/" style={({ isActive }) => ({ color: isActive ? "#62deec" : "" })} >
            Home
          </NavLink></li>
  
          <li><NavLink to="/stat" style={({ isActive }) => ({ color: isActive ? "#62deec" : "" })}>
            Stats
          </NavLink></li>
  
          <li><NavLink to="/friend" style={({ isActive }) => ({ color: isActive ? "#62deec" : "" })}>
            Friendlist
          </NavLink></li>
  
          <li><NavLink to="/history" style={({ isActive }) => ({ color: isActive ? "#62deec" : "" })}>
            Activities
          </NavLink></li>
        </ul>
        </div>
      </nav>
    );
  }