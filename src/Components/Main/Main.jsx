import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Main({userData,logOut}) {
  return <>
  <Navbar userData={userData} logOut={logOut}/>
  <div className="component-body">
  <Outlet/>
  </div>
  </>
}
