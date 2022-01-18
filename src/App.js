import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/navbar/navbar';
import Home from './pages/Home'
import Courses from './pages/Courses'
import Login from './pages/Login'
import React from 'react';
import { useState } from 'react';
import { app } from './firebase-config';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';


function App() {
	const [email,setEmail] = useState('');
	const [password, setPassword] = useState('');
	let navigate = useNavigate();
	const handleAction = (title) => {
		 const authentication = getAuth();
		 if(title==='Register') {
			  createUserWithEmailAndPassword(authentication, email, password).then((response) => {
					navigate('/courses')
					sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
			  }).catch((error) => {
				if(error.code === 'auth/email-already-in-use') {
					toast.error('Email already in use')
				}
			})
		 }
		 if(title==='Login') {
			 signInWithEmailAndPassword(authentication, email, password).then((response) => {
				 	navigate('/courses')
				 	sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
			 }).catch((error) => {
				 if(error.code === 'auth/wrong-password') {
					 toast.error('Please check the password')
				 }
				 if(error.code === 'auth/user-not-found') {
					 toast.error('Please check the email')
				 }
			 })
		 }
		 
	}
return (
  <div>
  	<>
	  <ToastContainer />
	  <Navbar/>
	  <div className="container mt-3"> 
    <Routes>
      <Route path='/' exact element={<Home/>}/>
      <Route path='/courses'  element={<Courses/>}/>
      
		<Route path='/login'  
        element={
          <Login 
            title='Login'
				setEmail={setEmail}
				setPassword={setPassword}
				handleAction = { () => handleAction('Login')}
          />}
        />
      <Route path='/register'  
        element={
          <Login 
            title='Register'
				setEmail={setEmail}
				setPassword={setPassword}
				handleAction = { () => handleAction('Register')}
          />}
        />
      
    </Routes>
	 </div>
  </>
  
  </div>
);
}

export default App;