import React from 'react'
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


function navbar() {
    return (
    <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div >
        <li> 
            <Link to='/' className="navbar-brand">Home</Link>
        </li>
        </div>
        <div className="navbar-nav mr-auto">
        <li > 
            <Link to='/courses' className="nav-link">Courses</Link>
        </li>
        <li >
            <Link to='/login' className="nav-link">Login</Link>
        </li>
        <li>
            <Link to='/register' className="nav-link">Register</Link>
        </li>
        </div>
        </nav>
    </div>
    )
}

export default navbar
