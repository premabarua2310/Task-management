import React, { Component, Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))


class App extends Component {



  render() {
    //const loggedIn = JSON.parse(localStorage.getItem('usersinfo'));
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
          
            {/* {
              loggedIn && userstatus
              <Route exact path="/" name="Login" element={<Login />} />
            } */}

            <Route
              exact
              path="/"
              name="Login"
              // element={
              //   loggedIn ? (
              //     <DefaultLayout />
              //   ) : (
              //     <Login />
              //   )

              //  }
              element={ <Login />}
            />

            <Route element={<ProtectedRoutes />}>
                 <Route path="*" name="Dasboard" element={<DefaultLayout />} />
            </Route>
            {/* <Route path="*" name="Dasboard" element={<DefaultLayout />} /> */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
