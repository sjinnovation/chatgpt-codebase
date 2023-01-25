import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { SpinnerDiamond } from 'spinners-react';


const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <SpinnerDiamond size={50} thickness={100} speed={100} color="#36ad47" secondaryColor="rgba(0, 0, 0, 0.44)" />
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace></Navigate>
    }
    return children;
}

export default PrivateRoute