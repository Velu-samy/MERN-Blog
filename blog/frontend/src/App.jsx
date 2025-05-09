import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import './App.css';
import Home from './pages/Home';
import Blog from './pages/Blog';

import List from './components/List';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Reviewpost from './pages/Reviewpost';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import Register from './components/Register';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Createblog from './components/Createblog';
import SearchResults from './components/SearchResults';
function App() {
  return (
   
  <div className="overflow-x-hidden">
  <BrowserRouter>
  <ScrollToTop />

    {/* Background */}
    <div className="bg fixed -z-10 top-0 w-full h-full">
      <div className="absolute top-0 h-full w-full h-screen bg-white z-0">
        {/* Radial Gradient Circles */}
      </div>
    </div>

    <div className="relative z-10">
      {/* Define Routes Properly */}
      <Routes>
      <Route path='/' element={<Home/>}/>
<Route path='/blog' element={<Blog/>}/>  
<Route path='/posts/:id' element={<Reviewpost/>}/>
<Route path='/contact' element={<Contact/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/login' element={<Signup/>}/>
<Route path="/dashboard" element={<Dashboard/>} />


      </Routes>
    </div>
  </BrowserRouter>
</div>
  );
}

export default App;