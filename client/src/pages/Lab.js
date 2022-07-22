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
        const url = 'http://10.0.3.12:' + cookies.assignedport + '/vnc.html'
        window.open(url)
    }

    function stoplab() {
        //send axios request to stop the session
        if(cookies.labuid){ 
            axios.post(`http://10.0.3.12:5000/labs/stopacontainer`, {
                thelabid: cookies.labuid
            })
            console.log('stopped container: ' + cookies.name)
            toast.success('Successfully stopped the session!')
            removeCookies('labuid')
            removeCookies('assignedport')
            navigate('/applications')
        }
    }

    return (
        <div>
            <ReactVNC portassigned={cookies.assignedport} />
            <Button variant="contained" onClick={handleAction}>Open session in a new tab</Button>
            <Button variant="contained" color="error" onClick={stoplab}>Stop the session</Button>
        </div>
    )
}

export default Lab
