import './App.css';

import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';

import Navbar from './components/navbarComponent'

import { AuthProvider } from './components/checkLoginComponent';

import Home from "./pages/HomePage"
import Friend from "./pages/Friend"
import History from "./pages/History"
import Stat from "./pages/Stat"
import About from "./pages/AboutPage"


export default function App() {
  return (
    <div className='App'>
      <AuthProvider>
    <Navbar/>
    <Routes>

      <Route path="/" element={<Home/>} />
      <Route path="/friend" element={<Friend />} />
      <Route path="/about" element={<About />} />
      <Route path="/stat" element={<Stat />} />
      

    </Routes>

    </AuthProvider>
    </div>


  );
}
