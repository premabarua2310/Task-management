import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  // cilBell,
  // cilCreditCard,
  // cilCommentSquare,
  // cilEnvelopeOpen,
  // cilFile,
  cilLockLocked,
  cilSettings,
  // cilTask,
  // cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

//import userPic from '../../../backend/public/images/profilepic-1691494137096.jpg'
import userPic from './../../assets/images/avatars/users.png'

const AppHeaderDropdown = () => {

  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    //localStorage.removeItem('userinfo');
    navigate('/');
  }

  // const user = JSON.parse(localStorage.getItem('usersinfo'));
  // const usertoken = user.token;
  // const decded = jwt_decode(usertoken);
  // const rpic = decded.userpic;
  // console.log(decded)

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {/* <CAvatar src={rpic} size="md" /> */}
        <CAvatar src={userPic} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">

        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>

        <CDropdownItem >
        <Link to={"/userprofile"} className='text-decoration-none' >
        <CIcon icon={cilSettings} className="me-2" />
            Profile
        </Link>
        </CDropdownItem>




        <CDropdownDivider />
        <CDropdownItem  onClick={logout}>
          <CIcon icon={cilLockLocked} className="me-2"/>
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
