import React from 'react'
import {Navigate, Outlet } from 'react-router-dom'

const useAuth = () => {
  const user = JSON.parse(localStorage.getItem('usersinfo'));
  return user && user.status
}
const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />

}
export default ProtectedRoutes
