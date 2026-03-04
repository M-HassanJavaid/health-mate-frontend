import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {

    const auth = useSelector((state)=> state.auth)

    if (!auth.isLogin) {
        return <Navigate to='/login' />
    }

    if (!auth.user.isVerified) {
      return <Navigate to='/verify-email' />
    }

  return children
}

export default ProtectedRoute