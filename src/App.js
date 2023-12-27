import "./styles.css";

import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';

import Navbar from './components/navbarComponent'

import Home from "./pages/HomePage"
import Friend from "./pages/Friend"
import History from "./pages/History"
import Stat from "./pages/Stat"


export default function App() {
  return (
    <div>
    <Navbar/>
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/friend" element={<Friend />} />
      <Route path="/history" element={<History />} />
      <Route path="/stat" element={<Stat />} />
      

    </Routes>
    </div>


  );
}
