import React from 'react'
import Login from '../Login/Login'

export default function ProtectedRoute({userData,children,saveUserData}) {
    if (userData === null) {
        return <Login saveUserData={saveUserData}/>
    }
    else {
        return children
    }
}
