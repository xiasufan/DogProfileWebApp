import React, { useState,useEffect } from 'react';
import styles from './index.module.css';
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = (event) => {
    event.stopPropagation();
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.closest('[data-toggle-sidebar]')) {
        return;
      }
      if (sidebarOpen && !event.target.closest(`.${styles.navbar}`)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [sidebarOpen]);
    return (
      <nav>
        <h1 style={{ color: 'white', fontSize: '2rem' }}>Welcome</h1>
        <ul className={`${styles.navbar} ${sidebarOpen ? styles.active : ''}`} >
          <li><NavLink to="/" style={({ isActive }) => ({ color: isActive ? "#62deec" : "" })} >
            Playground
          </NavLink></li>
  
          <li><NavLink to="/support" style={({ isActive }) => ({ color: isActive ? "#62deec" : "" })}>
            Support
          </NavLink></li>
  
          <li><NavLink to="/friend" style={({ isActive }) => ({ color: isActive ? "#62deec" : "" })}>
            Friendlist
          </NavLink></li>

          <li><NavLink to="/chat" style={({ isActive }) => ({ color: isActive ? "#62deec" : "" })}>
            Chat
          </NavLink></li>
  
          <li><NavLink to="/about" style={({ isActive }) => ({ color: isActive ? "#62deec" : "" })}>
            About
          </NavLink></li>
          
        </ul>
        <div className={`${styles.hamburgerMenu} ${sidebarOpen ? styles.active : ''}`} onClick={toggleSidebar} data-toggle-sidebar>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      </nav>
    );
  }