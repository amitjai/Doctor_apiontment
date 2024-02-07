import React from 'react'
import { Navigate } from 'react-router-dom';

function PublicRoute({children}) {
  
    const tokenId = localStorage.getItem("token");
    if(tokenId) {
        return <Navigate to='/' />
    } else {
        return children;
    }
}

export default PublicRoute