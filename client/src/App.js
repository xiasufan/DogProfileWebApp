import './App.css';

import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';

import Navbar from './components/navbarComponent'

import { AuthProvider } from './components/checkLoginComponent';

import Home from "./pages/HomePage"
import Friend from "./pages/Friend"
import Playground from "./pages/PlaygroundPage"
import About from "./pages/AboutPage"
import Chat from "./pages/ChatPage"


export default function App() {
  return (
    <div className='App'>
  <AuthProvider>
    <div className='Navbar'>
      <Navbar/>
    </div>
    <div className='Routes'>
      <Routes>
        <Route path="/" element={<Playground/>} />
        <Route path="/friend" element={<Friend />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  </AuthProvider>
</div>


  );
}
