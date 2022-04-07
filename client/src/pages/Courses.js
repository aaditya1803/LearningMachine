import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Courses() {
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
                    Courses
                </h3>
            </div>

        </div>
    )
}

export default Courses
