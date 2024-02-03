import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    isLogin();
  }, []);

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  //console.log(error);

  const isLogin = () => {
    const items = localStorage.getItem('usersinfo');
    if (items != null) {
      const loggedIn = JSON.parse(items);
      const userstatus = loggedIn.status;
        if (userstatus) {
          navigate('/dashboard');
        }else {
          navigate('/');
        }
    }
  }

  axios.withCredentials = true;

function handleSubmit(e){
  e.preventDefault();
  if (email.length==0||password.length==0){
    setError('Please Enter Email AND Password');
  } else {
    axios.post("http://localhost:8800/login", { email, password })
    .then(res => {
      if (res.data.status===true) {
       localStorage.setItem('usersinfo', JSON.stringify(res.data));
       navigate("/dashboard");
      } else {
       setError('Email or Password Error')
     }
    })
   }

  };


//   function handleSubmit(e){
//     //console.log(email);
//     //console.log(password);
//        e.preventDefault();
//      axios.post("http://localhost:8800/login", { email, password })
//        .then(res => {
//          console.log(res);
//          localStorage.setItem('usersinfo', JSON.stringify(res.data));
//          navigate("/dashboard");
//        }).catch(
//          err => setError('login failed')
//        );
// };
  //console.log(localStorage.getItem('result.token'));
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                { error ?
                      <div className="alert alert-danger" role="alert">
                    { error }
                      </div>
                      :""
                    }
                  <CForm onSubmit={handleSubmit} autocomplete="on">

                    <h1>Login</h1>



                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" type="email" name="email" autocomplete="email" onChange={e => setEmail(e.target.value)} required/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        autocomplete="password"
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>

                        <button  type="submit" className="btn btn-primary btn-block px-4"> Log In</button>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          {/* Forgot password? */}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>

                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
