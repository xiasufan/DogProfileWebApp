import React, { useState } from 'react';
import styles from './index.module.css';
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
    return (
      <nav>
        <h1 style={{ color: 'white', fontSize: '2rem' }}>Welcome</h1>
        <ul className={`${styles.navbar} ${sidebarOpen ? styles.active : ''}`} >
          <li><NavLink to="/" style={({ isActive }) => ({ color: isActive ? "#62deec" : "" })} >
            Home
          </NavLink></li>
  
          <li><NavLink to="/stat" style={({ isActive }) => ({ color: isActive ? "#62deec" : "" })}>
            Stats
          </NavLink></li>
  
          <li><NavLink to="/friend" style={({ isActive }) => ({ color: isActive ? "#62deec" : "" })}>
            Friendlist
          </NavLink></li>
  
          <li><NavLink to="/about" style={({ isActive }) => ({ color: isActive ? "#62deec" : "" })}>
            About
          </NavLink></li>
          
        </ul>
        <div className={`${styles.hamburgerMenu} ${sidebarOpen ? styles.active : ''}`} onClick={toggleSidebar}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      </nav>
    );
  }