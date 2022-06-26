import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import ApplicationsCard from '../components/common/ApplicationsCard'

function Applications() {
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
            <div className="heading-container">
                <h3>
                    Applications
                </h3>
                <ApplicationsCard />
            </div>

        </div>
    )
}

export default Applications
