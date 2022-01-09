import React from 'react';
import Form from '../components/common/Form';
import { useState } from 'react';
import {app} from '../firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

function Login(props) {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAction = (title) => {
        const authentication = getAuth();
        if(title='Register') {
            createUserWithEmailAndPassword(authentication, email, password).then((response) => {
                console.log(response)
            })
        }
        
    }
    return (
        <div>
            <Form 
                title={props.title}
                setEmail={props.setEmail}
                setPassword={props.setPassword}
                handleAction={() => handleAction(props.title)}
            />
        </div>
    )
}

export default Login
