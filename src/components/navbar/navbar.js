import React from 'react'
import { Link } from 'react-router-dom';
function navbar() {
    return (
        <div>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/courses'>Courses</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
        </div>
    )
}

export default navbar
