import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import logo from 'src/assets/images/logo.png'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import user from '../_user';
import jwt_decode from "jwt-decode";


const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [navi, setNavi] = useState([]);

  useEffect(() => {
    roleNav();
  }, []);

  const roleNav = () => {
    let role = "admin";
    const items = JSON.parse(localStorage.getItem('usersinfo'));
    const usertoken = items.token;
    const decoded = jwt_decode(usertoken);
    const userRole = decoded.role;
    //console.log(userRole)

    if (userRole == "user") {
      console.log(user);
      setNavi(user);
    } else {
      setNavi(navigation);
    }
    // const items = localStorage.getItem('usersinfo');
    // if (items != null) {
    //   const loggedIn = JSON.parse(items);
    //   const userstatus = loggedIn.status;
    //   if (userstatus) {
    //     setNavi(admin);
    //       // return "admin";
    //     }else {
    //       setNavi(user);
    //     }
    // }
  }


  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img src={logo} alt="" />
        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navi} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
