import React, { useEffect, useState } from 'react'
import {createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import Home from '../Home/Home'
import Main from '../Main/Main'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Notfound from '../Notfound/Notfound'
import AllGames from '../AllGames/AllGames'
import jwtDecode from 'jwt-decode'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Platforms from '../Platforms/Platforms'
import Pc from '../Platforms/Pc/Pc'
import Browser from '../Platforms/Browser/Browser'
import ReleaseDate from '../Sortby/ReleaseDate/ReleaseDate'
import Sortby from '../Sortby/Sortby'
import Popularity from '../Sortby/Popularity/Popularity'
import Alphabetical from '../Sortby/Alphabetical/Alphabetical'
import Relevance from '../Sortby/Relevance/Relevance'
import GameDetails from '../GameDetails/GameDetails'
import Categories from '../Categories/Categories'
import Shooter from '../Categories/Shooter/Shooter'
import Racing from '../Categories/Racing/Racing'
import Sports from '../Categories/Sports/Sports'
import Social from '../Categories/Social/Social'
import OpenWorld from '../Categories/OpenWorld/OpenWorld'
import Zombie from '../Categories/Zombie/Zombie'
import Fantasy from '../Categories/Fantasy/Fantasy'
import ActionRpg from '../Categories/ActionRpg/ActionRpg'
import Action from '../Categories/Action/Action'
import Flight from '../Categories/Flight/Flight'
import BattleRoyale from '../Categories/BattleRoyale/BattleRoyale'


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

  const router = createHashRouter([
    {
      path: '', element: <Main userData={userData} logOut={logOut} />, children: [
        { path: '', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Home /></ProtectedRoute> },
        { path: 'all-games', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><AllGames /></ProtectedRoute> },
        { path: 'game-details/:id', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><GameDetails /></ProtectedRoute> },
        {
          path: 'platforms', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Platforms /></ProtectedRoute>, children: [
            { path: 'pc', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Pc /></ProtectedRoute> },
            { path: 'browser', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Browser /></ProtectedRoute> }
          ]
        },
        {
          path: 'sort-by', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Sortby /></ProtectedRoute>, children: [
            { path: 'release-date', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><ReleaseDate /></ProtectedRoute> },
            { path: 'popularity', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Popularity /></ProtectedRoute> },
            { path: 'alphabetical', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Alphabetical /></ProtectedRoute> },
            { path: 'relevance', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Relevance /></ProtectedRoute> }
          ]
        },
        {
          path: 'categories', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Categories /></ProtectedRoute>, children: [
            { path: 'shooter', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Shooter /></ProtectedRoute> },
            { path: 'racing', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Racing /></ProtectedRoute> },
            { path: 'sports', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Sports /></ProtectedRoute> },
            { path: 'social', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Social /></ProtectedRoute> },
            { path: 'open-World', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><OpenWorld /></ProtectedRoute> },
            { path: 'zombie', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Zombie /></ProtectedRoute> },
            { path: 'fantasy', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Fantasy /></ProtectedRoute> },
            { path: 'action-rpg', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><ActionRpg /></ProtectedRoute> },
            { path: 'action', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Action /></ProtectedRoute> },
            { path: 'flight', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Flight /></ProtectedRoute> },
            { path: 'battle-royale', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><BattleRoyale /></ProtectedRoute> }
          ]
        },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <ProtectedRoute userData={userData} saveUserData={saveUserData}><Notfound /></ProtectedRoute> }
      ]
    }
  ])
  return <>
    <RouterProvider router={router} />
  </>
}