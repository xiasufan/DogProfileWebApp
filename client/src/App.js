import './App.css';

import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';

import Navbar from './components/navbarComponent'

import useAuth from './components/checkLoginComponent'

import Home from "./pages/HomePage"
import Friend from "./pages/Friend"
import History from "./pages/History"
import Stat from "./pages/Stat"


export default function App() {
  const { loginName, loginRole } = useAuth();
  return (
    <div className='App'>
    <Navbar/>
    <Routes>

      <Route path="/" element={<Home loginName={loginName}
              loginRole={loginRole}/>} />
      <Route path="/friend" element={<Friend />} />
      <Route path="/history" element={<History />} />
      <Route path="/stat" element={<Stat />} />
      

    </Routes>
    </div>


  );
}
