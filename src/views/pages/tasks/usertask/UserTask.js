
import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import TaskTable from './Tabledata';
import jwt_decode from "jwt-decode";
import {
  CContainer,CButton,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,CTable,CTableHead,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell,
} from '@coreui/react'

const UserTask = () => {


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
        if (userRole ==='admin') {
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
          <Link to={"/adduserstask"} ><CButton color="primary">Add Task</CButton></Link>
            </CCol>
        </CRow>
      </CContainer>
          <TaskTable />
    </>
  )
}

export default UserTask
