import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import ReactVNC from '../components/lab/Reactvnc'
import Button from '@mui/material/Button';
import axios from 'axios'
import { useCookies } from 'react-cookie'

const Lab = () => {
    let navigate = useNavigate();

    const [cookies, setCookies, removeCookies] = useCookies('labuid')    

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if(!authToken) {
            toast.error('Please login to view this page')
            setTimeout(function(){
                navigate('/login')
            },1000)
        }
        if(!cookies.labuid) {
            toast.error('Please launch a lab session to view this page')
            navigate('/applications')
        }
    }, [])

    function handleAction() {
        window.open('http://192.168.1.4:6080/vnc.html')
    }

    function stoplab() {
        //send axios request to stop the session
        if(cookies.labuid){ 
            axios.post(`http://192.168.1.4:5000/labs/stopacontainer`, {
                thelabid: cookies.labuid
            })
            console.log('stopped container: ' + cookies.name)
            toast.success('Successfully stopped the session!')
            removeCookies('labuid')
            navigate('/applications')
        }
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
