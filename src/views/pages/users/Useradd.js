import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {
  CButton,
  CRow,
  CCol,
  CCard,
  CCardHeader,CForm,CFormLabel,CFormInput,CFormTextarea,CFormSelect,
  CCardBody,
} from '@coreui/react'

const Useradd = () => {

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






  const [userInfo, setUserInfo] = useState({
     username : "",
     email : "",
     password : "",
     userrole : "",
  })

  const [file, setFile] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


 const handleSubmit = async (e) => {

   e.preventDefault();

    const formData = new FormData();
    formData.append("username", userInfo.username);
    formData.append("email", userInfo.email);
    formData.append("password", userInfo.password);
    formData.append("userrole", userInfo.userrole);
    formData.append("profilepic", file);


      axios.post("http://localhost:8800/user", formData)
              .then(res => {
               if (res) {
                  navigate("/users");
               } else {
                   alert('Error');
               }
           })
           .then(err => console.log(err));
      }

return (
<>
<CCard className="mb-4">
   <CCardHeader>
      ADD USER
   </CCardHeader>
   <CCardBody>
      <CForm onSubmit={handleSubmit}>
         <CRow className="mb-3">
            <CFormLabel htmlFor="inputTask" className="col-sm-2 col-form-label">
               User Name
            </CFormLabel>
            <CCol sm={10}>
               <CFormInput type="text" name="username" id="username" placeholder="Enter Your Name"  onChange={handleChange} />
            </CCol>
         </CRow>
         <CRow className="mb-3">
            <CFormLabel htmlFor="inputEmail" className="col-sm-2 col-form-label">
               Email
            </CFormLabel>
            <CCol sm={10}>
               <CFormInput type="text" id="email" name="email" placeholder="Enter Your Email" onChange={handleChange} />
            </CCol>
         </CRow>
         <CRow className="mb-3">
            <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
               Password
            </CFormLabel>
            <CCol sm={10}>
               <CFormInput type="password" name="password" id="password" placeholder="Enter Your Password" onChange={handleChange}/>
            </CCol>
         </CRow>
         <CRow className="mb-3">
            <CFormLabel htmlFor="inputPerson" className="col-sm-2 col-form-label">
               User Type
            </CFormLabel>
            <CCol sm={10}>
              <CFormSelect
              name="userrole"
              onChange={handleChange}
               aria-label="Default select example"
               options={[
               'Please Select...',
               { label: 'User', value: 'user' },
               { label: 'Admin', value: 'admin' },
               ]}
               />
            </CCol>
         </CRow>

         <CRow className="mb-3">
            <CFormLabel htmlFor="inputEmail" className="col-sm-2 col-form-label">
               File
            </CFormLabel>
            <CCol sm={10}>
               <CFormInput type="file" id="profilepic" name="profilepic" onChange={e => setFile(e.target.files[0])} />
            </CCol>
         </CRow>
         <CRow className="mt-4">
            <CCol className="mb-3 d-flex justify-content-center">
               <CButton style={{ width: '10rem',marginRight: "10px" }} type="submit">Submit</CButton>
               <Link to={"/user"} >
               <CButton style={{ width: '10rem',color:'white' }} color="danger">Cancel</CButton></Link>
            </CCol>
         </CRow>
      </CForm>
   </CCardBody>
</CCard>
</>
  )
}

export default Useradd
