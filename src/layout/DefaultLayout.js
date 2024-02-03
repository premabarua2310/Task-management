import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
const DefaultLayout = () => {

  // const user = JSON.parse(localStorage.getItem('usersinfo'));
  // const usertoken = user.token;
  // const decoded = jwt_decode(usertoken);
  // console.log(decoded)

  // const navigate = useNavigate();
  // const navigateLogin =  navigate('/');

  return (
    <div>

       <AppSidebar />
       <div className="wrapper d-flex flex-column min-vh-100 bg-light">
         <AppHeader />
         <div className="body flex-grow-1 px-3">
           <AppContent />
         </div>
         <AppFooter />
          </div>
      </div >

  )
}

export default DefaultLayout
