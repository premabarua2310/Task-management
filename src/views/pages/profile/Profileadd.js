/* eslint-disable no-dupe-keys */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {
  CButton,
  CRow,
  CCol,
  CCard,
  CCardHeader, CForm, CFormLabel, CFormInput, CFormTextarea,
  CCardBody, CFormSelect, CFormCheck
} from '@coreui/react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import Swal from 'sweetalert2'

// const successAlert = () => {
//   Swal.fire({
//     title: 'Thank you!',
//     text: 'You clicked the button.',
//     icon: 'success'
//   });
// }
 
// const deleteAlert = () => {
//   Swal.fire({
//     title: "Are you sure?",
//     text: ("You want to delete this information !"),
//     type: "warning",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#d33',
//     confirmButtonText: "Yes",
//     closeOnConfirm: false,
//     buttons: true,
//     buttons: ["No", "Yes"]
//   })
//     .then(function (isConfirm) {
//       if (isConfirm) {

//       }
//     });
// }

const Profileadd = () => {

  const [startDate, setStartDate] = useState(new Date());

  // const Alert = () => {
  //   Swal.fire("Thank you")
  // }

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
      if (userRole === 'user') {
        navigate('/dashboard');
      }
    }
  }

  const [profile, setProfile] = useState({
    profile_username: "",
    profile_email: "",
    profile_phone: "",
  });

  const handleChange = (e) => {

    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [error, setError] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profile.profile_username.length == 0 || profile.profile_email.length==0 || profile.profile_phone.length==0 ) {
      setError(true);
    }

    try {
      await axios.post("http://localhost:8800/profile", profile);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          ADD PROFILE
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CRow className='mb-3'>
            <h5 className='mb-4'>USER INFORMATION</h5>
              <CCol>
              {error ? <CFormLabel className="col-sm-2 col-form-label">
               Username cant be empty
            </CFormLabel>:""}
                <CFormLabel htmlFor="inputUsername">Username</CFormLabel>
                <CCol xs>
                  <CFormInput type='text' placeholder="Username" aria-label="Username" onChange={handleChange} required />
                </CCol>
              </CCol>
              <CCol>
              {error ? <CFormLabel className="col-sm-2 col-form-label">
               Email address cant be empty
            </CFormLabel>:""}
                <CFormLabel htmlFor="inputTask" >Email address</CFormLabel>
                <CCol xs>
                  <CFormInput type='text' placeholder="email@email.com" aria-label="Email address" onChange={handleChange} required />
                </CCol>
              </CCol>
            </CRow>

            <CRow className='mt-3'>
              <CCol>
                <CFormLabel htmlFor="inputFirstName">First name</CFormLabel>
                <CCol xs>
                  <CFormInput placeholder="First name" aria-label="First name" />
                </CCol>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="inputLastName">Last name</CFormLabel>
                <CCol xs>
                  <CFormInput placeholder="Last name" aria-label="Last name" />
                </CCol>
              </CCol>
            </CRow>

            <CRow className='mt-3'>
              <CCol>
              {error ? <CFormLabel className="col-sm-2 col-form-label">
               Phone number cant be empty
            </CFormLabel>:""}
                <CFormLabel htmlFor="inputPhone">Phone number</CFormLabel>
                <CCol xs>
                  <CFormInput placeholder="+880" aria-label="Phone number" onChange={handleChange} required />
                </CCol>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="inputBirthday">Birthday</CFormLabel>
                <CCol xs>
                  <CFormLabel placeholder="+880" aria-label="Birthday date"><DatePicker selected={startDate} onChange={(date) =>
                    setStartDate(date)} /> </CFormLabel>

                </CCol>
              </CCol>
            </CRow>

            <CRow>
              <h5 className='mt-4 mb-4'>CONTACT INFORMATION</h5>
              <CFormLabel htmlFor="inputAddress">Address</CFormLabel>
              <CCol xs>
                <CFormInput placeholder="Address" aria-label="Address" />
              </CCol>
            </CRow>
            <CRow className='mt-3'>
              <CCol>
                <CFormLabel htmlFor="inputCity">City</CFormLabel>
                <CCol xs>
                  <CFormInput placeholder="City" aria-label="City" />
                </CCol>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="inputCountry">Country </CFormLabel>
                <CFormSelect aria-label="Country list">
                  <option>Country list</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                  <option value="5" disabled>Five</option>
                </CFormSelect>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="inputPostal">Postal Code</CFormLabel>
                <CCol xs>
                  <CFormInput placeholder="Postal code" aria-label="Postal Code" />
                </CCol>
              </CCol>
            </CRow>

            <CRow>
              <h5 className='mt-4 mb-4'>ABOUT ME</h5>
              <CFormLabel htmlFor="inputAbout">About me </CFormLabel>
              <CCol sm={12}>
                <CFormTextarea
                  rows={2}
                  name="project_description"
                  id="project_description"
                  placeholder="About me">
                </CFormTextarea>
              </CCol>
            </CRow>
            <CRow>
              <CFormLabel htmlFor="inputProfile" className="col-sm-2 col-form-label">
                Profile Picture
              </CFormLabel>
              <CCol sm={12}>
                <CFormInput type="file" />
              </CCol>
            </CRow>

            <CFormCheck className='mt-4' type="checkbox" id="gridCheck" label="I agree the terms & policy" />

            <CRow className="mt-4">
              <CCol className="mb-3 d-flex justify-content-center">
                {/* <CButton style={{ width: '10rem', marginRight: "10px" }} type="submit" onClick={successAlert} >Submit</CButton>
                <Link to={"/Profiles"} ><CButton style={{ width: '10rem', color: 'white' }} color="danger" onClick={deleteAlert} >Cancel</CButton></Link> */}
                <CButton style={{ width: '10rem', marginRight: "10px" }} type="submit" >Submit</CButton>
                <Link to={"/Profiles"} ><CButton style={{ width: '10rem', color: 'white' }} color="danger" >Cancel</CButton></Link>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Profileadd
