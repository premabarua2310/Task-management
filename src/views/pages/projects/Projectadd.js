/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {
  CButton,
  CRow,
  CCol,
  CCard,
  CCardHeader,CForm,CFormLabel,CFormInput,CFormTextarea,
  CCardBody,CFormSelect
} from '@coreui/react'

const Projectadd = () => {

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

  const [project, setProject] = useState({
    project_name: "",
    project_description: "",
    project_status: "new",
  });

  const handleChange = (e) => {

  setProject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};  

const [error,setError] = useState(false)


const handleSubmit = async (e) => {
  e.preventDefault();
  if (project.project_name.length==0||project.project_description.length==0){
    setError(true);
   }

  try {
    await axios.post("http://localhost:8800/project", project);
    navigate("/projects");
  } catch (err) {
    console.log(err);
    setError(true)
  }
};

return (
<>
<CCard className="mb-4">
   <CCardHeader>
      ADD PROJECTS
   </CCardHeader>
   <CCardBody>
      <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            {error ? <CFormLabel className="col-sm-2 col-form-label">
               Task name cant be empty
            </CFormLabel>:""}
            <CFormLabel htmlFor="inputTask" className="col-sm-2 col-form-label">
               NAME
            </CFormLabel>
            <CCol sm={10}>
               <CFormInput type="text" name="project_name" id="project_name" placeholder="Enter Project Name" onChange={handleChange} required/>
            </CCol>
         </CRow>
          <CRow className="mb-3">
          {error ? <CFormLabel className="col-sm-2 col-form-label">
               Task description cant be empty
            </CFormLabel>:""}
            <CFormLabel htmlFor="inputNote" className="col-sm-2 col-form-label">
               DESCRIPTION
            </CFormLabel>
            <CCol sm={10}>
               <CFormTextarea
                Label="Enter Description"
                rows={5}
                name="project_description"
                id="project_description"
                placeholder="Enter Description"
                onChange={handleChange}
               required></CFormTextarea>
            </CCol>
          </CRow>
          <CRow className="mb-3">
          <CFormLabel htmlFor="inputPerson" className="col-sm-2 col-form-label">
               Status
            </CFormLabel>
            <CCol sm={10}>
              <CFormSelect name="project_status" onChange={handleChange} value="new" required>
                  <option value="new" >New</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
              </CFormSelect>
            </CCol>
         </CRow>
         <CRow className="mt-4">
            <CCol className="mb-3 d-flex justify-content-center">
               <CButton style={{ width: '10rem',marginRight: "10px" }} type="submit">Submit</CButton>
               <Link to={"/projects"} ><CButton style={{ width: '10rem',color:'white' }} color="danger">Cancel</CButton></Link>
            </CCol>
         </CRow>
      </CForm>
   </CCardBody>
</CCard>
</>
  )
}

export default Projectadd
