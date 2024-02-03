import React, { useState } from 'react';
import { Link, useNavigate,useParams } from "react-router-dom";
import axios from 'axios';





const UserProfileById = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  //console.log(id);
  const [userPassword, setuserPassword] = useState()

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put("http://localhost:8800/changepassbyid/"+id, { userPassword } )
    .then(res => {
      //  console.log(res.data);
       navigate("/users");
})
}





  return (
<div className="container rounded bg-white mt-5 mb-5">
   <div className="row">
      <div className="col-md-3 border-right">
         <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span className="font-weight-bold">Edogaru</span><span className="text-black-50">edogaru@mail.com.my</span><span> </span></div>
      </div>
      <div className="col-md-8 border-right">
         <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
               <h4 className="text-right">Password Change</h4>
            </div>
            <form onSubmit={handleUpdate}>
            <div className="row mt-2">
               <div className="col-md-6"><label className="labels">Password</label>
                  <input type="text" className="form-control mt-3" placeholder="Enter Password" onChange={e => setuserPassword(e.target.value)}/>
               </div>
            </div>

            <div className="mt-3">
              <input type="submit" className="btn btn-primary profile-button" value="Update Password" />
            </div>
            </form>
         </div>
      </div>
   </div>
</div>

  )
}

export default UserProfileById
