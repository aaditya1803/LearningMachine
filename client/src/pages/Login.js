import React from 'react';
// import Form from '../components/common/Form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function Login(props) {

    return (
        <div>
            <div>
            <div className="heading-container">
                <h3>
                    {props.title} Form
                </h3>
            </div>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="email"
                    label="Enter the Email"
                    variant="outlined"
                    onChange={(e) => props.setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Enter the Password"
                    type="password"
                    variant="outlined"
                    onChange={(e) => props.setPassword(e.target.value)}
                />
            </Box>

            <Button variant="contained" onClick={props.handleAction}>{props.title}</Button>
            </div>
        </div>
    )
}

export default Login
