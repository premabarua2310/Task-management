import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import {
   CButton,
   CRow,
   CCol,
   CCard,
   CCardHeader, CForm, CFormLabel, CFormInput, CFormTextarea,
   CCardBody, CFormSelect
} from '@coreui/react'

const Projectupdate = () => {

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
      const item = localStorage.getItem('usersinfo');
      if (item != null) {
         const loggedIn = JSON.parse(item);
         const usertoken = loggedIn.token;
         const decoded = jwt_decode(usertoken);
         const userRole = decoded.role;
         if (userRole === 'user') {
            navigate('/dashboard');
         }
      }
   }

   const { id } = useParams();

   const [project, setProject] = useState({
      project_name: "",
      project_description: "",
      project_status: "new",
   });

   console.log(project);

   useEffect(() => {
      axios.get('http://localhost:8800/project/' + id)
         .then(res => {
            //console.log(res.data[0].project_name);
            setProject({
               project_name: res.data[0].project_name,
               project_description: res.data[0].project_description,
               project_status: res.data[0].status,
            });
         })
         .catch(err => console.log(err))
   }, [])

   const handleUpdate = (e) => {
      e.preventDefault();
      axios.put("http://localhost:8800/project/" + id, project)
         .then(res => {
            // console.log(res);
            navigate("/projects");
         })
   }

   //   const showRenderStatus = () => {
   //     if (project.project_status == 'new') {
   //       return <option value="new">New</option>;
   //     } else if (project.project_status == 'ongoing') {
   //       return <option value="ongoing">Ongoing</option>;
   //     } else {
   //       return <option value="completed">Completed</option>;
   //     }
   // }

   return (
      <>
         <CCard className="mb-4">
            <CCardHeader>
               EDIT PROJECT
            </CCardHeader>
            <CCardBody>
               <CForm onSubmit={handleUpdate}>
                  <CRow className="mb-3">
                     <CFormLabel htmlFor="inputTask" className="col-sm-2 col-form-label">
                        NAME
                     </CFormLabel>
                     <CCol sm={10}>
                        <CFormInput type="text" name="project_name" id="project_name" placeholder="Enter Project Name"
                           value={project.project_name}
                           onChange={e => setProject({ ...project, project_name: e.target.value })} />
                     </CCol>
                  </CRow>
                  <CRow className="mb-3">
                     <CFormLabel htmlFor="inputNote" className="col-sm-2 col-form-label">
                        DESCRIPTION
                     </CFormLabel>
                     <CCol sm={10}>
                        <CFormTextarea
                           Label="Enter description"
                           rows={5}
                           name="project_description"
                           id="project_description"
                           placeholder="Enter Description"
                           value={project.project_description}
                           onChange={e => setProject({ ...project, project_description: e.target.value })}
                        ></CFormTextarea>
                     </CCol>
                  </CRow>
                  <CRow className="mb-3">
                     <CFormLabel htmlFor="inputPerson" className="col-sm-2 col-form-label">
                        Status
                     </CFormLabel>
                     <CCol sm={10}>
                        <CFormSelect aria-label="Default select example" value={project.project_status} name="project_status" id="project_id" onChange={e => setProject({ ...project, project_status: e.target.value })} >

                           <option value="new">New</option>
                           <option value="ongoing">Ongoing</option>
                           <option value="completed">Completed</option>
                        </CFormSelect>
                     </CCol>
                  </CRow>
                  <CRow className="mt-4">
                     <CCol className="mb-3 d-flex justify-content-center">
                        <CButton style={{ width: '10rem', marginRight: "10px" }} type="submit">Update</CButton>
                        <Link to={"/projects"} ><CButton style={{ width: '10rem', color: 'white' }} color="danger">Cancel</CButton></Link>
                     </CCol>
                  </CRow>
               </CForm>
            </CCardBody>
         </CCard>
      </>
   )
}

export default Projectupdate
