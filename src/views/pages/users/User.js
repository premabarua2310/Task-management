
import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import UserTable from './Tabledata'
import {
  CContainer,CButton,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,CTable,CTableHead,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,
} from '@coreui/react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
const User = () => {

  const navigate = useNavigate();
  useEffect(() => {
    isRole();
  }, []);



  // const items = JSON.parse(localStorage.getItem('usersinfo'));
  // const usertoken = items.token;
  // const decoded = jwt_decode(usertoken);
  // const userId = decoded.uid;
  // const userName = decoded.username;
  // const userRole = decoded.role;

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
          <Link to={"/adduser"}><CButton color="primary">Add User </CButton></Link>
            </CCol>
        </CRow>
      </CContainer>
      <UserTable />
    </>
  )
}

export default User
