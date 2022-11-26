import React, { useEffect, useState } from 'react'
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import Home from '../Home/Home'
import Main from '../Main/Main'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Notfound from '../Notfound/Notfound'
import AllGames from '../AllGames/AllGames'
import jwtDecode from 'jwt-decode'
import GameDetails from '../GameDetails/GameDetails'
import {Provider} from 'react-redux'
import store from '../../Redux/store'



export default function App() {

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserData()
    }
  }, [])

  const [userData, setuserData] = useState(null)
  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken)
    setuserData(decodedToken);
  }

  function logOut() {
    localStorage.removeItem('userToken')
    setuserData(null);
    return <Navigate to='/login' />
  }

  function ProtectedRoute({children }) {
    if (userData === null) {
      return <Login saveUserData={saveUserData} />
    }
    else {
      return children
    }
  }

  const router = createHashRouter([
    {
      path: '', element: <Main userData={userData} logOut={logOut} />, children: [
        { path: '', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: '/:cat/:path', element: <ProtectedRoute><AllGames /></ProtectedRoute> },
        { path: 'game-details/:id', element: <ProtectedRoute><GameDetails /></ProtectedRoute> },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <ProtectedRoute><Notfound /></ProtectedRoute> }
      ]
    }
  ])
  return <>
  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>

  </>
}