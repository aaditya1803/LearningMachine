import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function Courses() {
    let navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token')
        navigate('/')
    }
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if(!authToken) {
            navigate('/login')
        }
    }, [])
    return (
        <div>
            <div className="heading-container">
                <h3>
                    Courses
                    <button onClick={handleLogout}>Logout</button>
                </h3>
            </div>

        </div>
    )
}

export default Courses
