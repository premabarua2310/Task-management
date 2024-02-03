import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from "react-data-table-component"
import jwt_decode from "jwt-decode";
//import AdminTable from './Tabledata';
import {
CContainer,CButton,
CRow,
CCol,
CCard,
CCardHeader,
CCardBody,
CForm,CFormLabel,CFormInput,CFormSelect,CBadge
} from '@coreui/react'
const AdminReport = () => {



  const badge = {
    padding: '8px 8px',
    textAlign:'center',
    borderRadius: '5px',
    fontSize: '12px',
  };


  const navigate = useNavigate();
  useEffect(() => {
    isRole();
  }, []);



  const items = JSON.parse(localStorage.getItem('usersinfo'));
  const usertoken = items.token;
  const decoded = jwt_decode(usertoken);
  const userId = decoded.uid;
  const userName = decoded.username;
  const userRole = decoded.role;

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








  const [project, setProject] = useState([]);
  const [users, setUsers] = useState([]);

  const [projectName, setprojectName] = useState(null)
  const [taskPerson, setTaskPerson] = useState(null);
  const [taskStatus, setStatus] = useState(null)
  const [asssignDate, setSelectedDate] = useState(new Date());
  const [completeDate, setcompleteDatee] = useState(new Date())

  const [error,setError] = useState(false)

  const [reportData, SetReportData] = useState([]);

  useEffect(() => {

    async function callApiProject(){
           const apiProjectResult = await axios.get('http://localhost:8800/project/');
           setProject(apiProjectResult.data);
         }
         callApiProject();


    async function callApiUser(){
          const apiUserResult = await axios.get('http://localhost:8800/user/');
          setUsers(apiUserResult.data);
          }
          callApiUser();

  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:8800/adminreport", { projectName, taskPerson, taskStatus, asssignDate, completeDate })
      .then(res => {
        SetReportData(res.data);
        //console.log(res.data);

      })
  }


  const columns = [
    {
      name: "Task Name",
      selector: row => row.task_name,
      sortable: false,
    },
    {
      name: "Status",
      cell: (row) => { return showRenderStatus(row.status)}
    },
    {
      name: "Cmpleted Date",
      selector:row =>row.completed_date
    },
    {
      name: "Assigned Person Name",
      selector:row =>row.username
    },
    {
      name: "Project Name",
      selector:row =>row.project_name
    },

  ]

  const showRenderStatus = (status) => {
    if (status == 'new') {
      return <CBadge color="primary" style={badge}>{status}</CBadge>;
    } else if (status == 'ongoing') {
      return <CBadge color="warning" style={badge}>{status}</CBadge>;
    } else {
      return <CBadge color="success" style={badge}>{status}</CBadge>;
    }
}


return (
<>
<CCard className="mb-4">
   <CCardHeader>
      ADMIN REPORT
   </CCardHeader>
   <CCardBody>
      <CForm onSubmit={handleSubmit}>
         <CRow className="align-items-start mb-3">
            <CCol>
               <CFormLabel htmlFor="inputTask" className=" col-form-label">
                  Project
               </CFormLabel>
               <CFormSelect aria-label="Default select example" name="project_id" id="project_id" onChange={e => setprojectName(e.target.value)}>
                  <option >Please Select</option>
                        {
                       project.map((list, index ) => (
                        <option value={list.id} key={index}>{list.project_name}</option>
                        ))}
              </CFormSelect>
            </CCol>
            <CCol>
               <CFormLabel htmlFor="inputTask" className=" col-form-label">
                  Task Person
               </CFormLabel>
               <CFormSelect aria-label="Default select example" name="assign_user_id"  id="assign_user_id" onChange={e => setTaskPerson(e.target.value)}>
              <option >Please Select</option>
                        {
                       users.map((list, index ) => (
                        <option value = {list.id} key={list.id}>{list.username}</option>
                        ))}
              </CFormSelect>
            </CCol>
            <CCol>
               <CFormLabel htmlFor="inputTask" className=" col-form-label">
                  Task Status
               </CFormLabel>
               <CFormSelect aria-label="Default select example" name="task_status" id="task_status"  onChange={e => setStatus(e.target.value)}>
                  <option>Please Select</option>
                  <option value="new">New</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="complited">Completed</option>
              </CFormSelect>
            </CCol>

          </CRow>
          <CRow className="mt-4">
          <CCol sm="auto">
               <CFormLabel htmlFor="inputTask" className=" col-form-label">
                  Start Date
               </CFormLabel>
              <DatePicker
                showIcon
                name="asssign_date"
                selected={asssignDate}
                onChange={ date => setSelectedDate(date)}
                dateFormat='yyyy-MM-dd'
                showYearDropdown
                scrollableYearDropdown
                label="Basic date picker"
                     />
            </CCol>
            <CCol sm="auto">
               <CFormLabel htmlFor="inputTask" className=" col-form-label">
                  Completed Date
               </CFormLabel>
              <DatePicker
                showIcon
                label="Basic date picker"
                name="complete-date"
                selected={completeDate}
                onChange={date => setcompleteDatee(date)}
                dateFormat='yyyy-MM-dd'
                showYearDropdown
                scrollableYearDropdown
                />
            </CCol>
            {/* <CCol>

               <CButton  type="submit" className="mt-4">Submit</CButton>
            </CCol> */}

          </CRow>
          <CRow >
            <CCol  className="mb-3 mt-3 d-flex justify-content-center">
               <CButton style={{ width: '10rem',marginRight: "10px",marginTop: "10px" }} type="submit">Submit</CButton>

            </CCol>
         </CRow>

      </CForm>
   </CCardBody>
</CCard>
<CCard className="mb-4" >
   <CCardHeader>
      REPORT TABLE
   </CCardHeader>
   <CCardBody >
        {/* <AdminTable data={reportData} /> */}
        <DataTable
      columns={columns}
      data={reportData}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="450px"
      options={{
            headerStyle: {
              zIndex: 0
            }
      }}

    />
   </CCardBody>
</CCard>
</>
)
}
export default AdminReport
