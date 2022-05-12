import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import ReactVNC from '../components/lab/Reactvnc'

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
    return (
        <div>
            <ReactVNC />
        </div>
    )
}

export default Lab
