/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ProfileTable from './DataProfile';
import jwt_decode from "jwt-decode";

//const secretkey = "Bijoy*7890!@#657$";
//const secretkey = process.env.SECRET_KEY;
import {
  CContainer,CButton,
  CRow,
  CCol,
//   CCard,
//   CCardHeader,
//   CCardBody,CTable,CTableHead,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,
} from '@coreui/react'

const Profile = () => {


  const navigate = useNavigate();
  useEffect(() => {
    isRole();
  }, []);

  const isRole = () => {
    const items = localStorage.getItem('usersinfo');
    if (items != null) {
      const loggedIn = JSON.parse(items);
      const usertoken = loggedIn.token;
      const decoded = jwt_decode(usertoken);
      const userRole = decoded.role;
        if (userRole ==='user') {
          navigate('/dashboard');
        }
    }
  }


  return (
    <>
      <CContainer fluid>
        <CRow className="align-items-end">
          <CCol md={10}></CCol>
          <CCol md={2} className="mb-4">
          <Link to={"/addprofile"} ><CButton color="primary">Add Profile </CButton></Link>
            </CCol>
        </CRow>
      </CContainer>
      <ProfileTable />
    </>
  )
}

export default Profile
