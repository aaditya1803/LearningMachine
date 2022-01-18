import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar/navbar';
import Home from './pages/Home'
import Courses from './pages/Courses'
import Login from './pages/Login'
import * as React from 'react';
import { useState } from 'react';


function App() {

return (
  <div>
  

  	<Router>
	  <Navbar/>
	  <div className="container mt-3"> 
    <Routes>
      <Route path='/' exact element={<Home/>}/>
      <Route path='/courses'  element={<Courses/>}/>
      <Route path='/login'  
        element={
          <Login 
            title='Login'
          />}
        />
      <Route path='/register'  
        element={
          <Login 
            title='Register'
          />}
        />
      
    </Routes>
	 </div>
  </Router>
  
  </div>
);
}

export default App;