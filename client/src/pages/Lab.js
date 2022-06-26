import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import ReactVNC from '../components/lab/Reactvnc'
import Button from '@mui/material/Button';

const Lab = () => {
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if(!authToken) {
            toast.error('Please login to view this page')
            setTimeout(function(){
                navigate('/login')
            },1000)
        }
    }, [])

    function handleAction() {
        window.open('http://192.168.1.4:6080/vnc.html')
    }

    function stoplab() {
        //send axios request to stop the session
    }

    return (
        <div>
            <ReactVNC />
            <Button variant="contained" onClick={handleAction}>Open session in a new tab</Button>
            <Button variant="contained" color="error" onClick={stoplab}>Stop the session</Button>
        </div>
    )
}

export default Lab
