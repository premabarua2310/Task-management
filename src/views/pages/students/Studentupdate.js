import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const Studentupdate = () => {


  return (
<>
{/*
<div className="container m-3">
   <div className="row">
      <div className="col-md-12">
         <div className="card p-3">
            <div className="caed-header">
               <h3>Add New Student</h3>
            </div>
         </div>
      </div>
   </div>
</div>
*/}
<div className="container m-3">
   <div className="row ">
      <div className="col-md-12">
         <div className="card p-3">
            <div className="caed-header">
               <h3>Edit Student</h3>
            </div>
            <div className="card-body">
               <form>
                  <div className="row mb-3">
                     <label htmlFor="studentname" className="col-sm-2 col-form-label">Name</label>
                     <div className="col-sm-10">
                        <input type="text" className="form-control" id="studentname" />
                     </div>
                  </div>
                  <div className="row mb-3">
                     <label htmlFor="studentid" className="col-sm-2 col-form-label">Student Id</label>
                     <div className="col-sm-10">
                        <input type="text" className="form-control" id="studentid" />
                     </div>
                  </div>
                  <div className="row mb-3">
                     <label htmlFor="studentemail" className="col-sm-2 col-form-label">Email</label>
                     <div className="col-sm-10">
                        <input type="email" className="form-control" id="studentemail" />
                     </div>
                  </div>
                  <div className="row mb-3">
                     <label htmlFor="studentaddress" className="col-sm-2 col-form-label">Address</label>
                     <div className="col-sm-10">
                        <textarea className="form-control" placeholder="Address here" id="studentaddress"></textarea>

                     </div>
                  </div>

                  <fieldset className="row mb-3">
                     <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
                     <div className="col-sm-10">
                        <div className="form-check">
                           <input className="form-check-input" type="radio" name="gender" id="male" value="male" checked />
                           <label className="form-check-label" htmlFor="male">
                           Male
                           </label>
                        </div>
                        <div className="form-check">
                           <input className="form-check-input" type="radio" name="gender" id="female" value="female" />
                           <label className="form-check-label" htmlFor="female">
                           Female
                           </label>
                        </div>
                     </div>
                  </fieldset>
                  <div className="row mb-3">
                     <label htmlFor="studentid" className="col-sm-2 col-form-label">Section</label>
                     <div className="col-sm-10">
                     <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                     </div>
                  </div>
                  <div className="row mb-3">
                     <label htmlFor="studentid" className="col-sm-2 col-form-label">Subject</label>
                     <div className="col-sm-10">
                        <div className="form-check">
                           <input type="checkbox" className="form-check-input" id="check1" name="option1" value="something" />
                           <label className="form-check-label" htmlFor="check1">Option 1</label>
                        </div>
                        <div className="form-check">
                           <input type="checkbox" className="form-check-input" id="check2" name="option2" value="something" />
                           <label className="form-check-label" htmlFor="check2">Option 2</label>
                        </div>
                     </div>
                  </div>
                  <div className="row d-flex justify-content-center">
                     <div className="col-4 mb-3 ">
                        <button className="btn btn-success"style={{ width: '10rem',marginRight: "10px" }} type="submit">Update</button>
                        <Link to={"/student"} >
                        <button style={{ width: '10rem',color:'white' }}className="btn btn-danger">Cancel</button></Link>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>
</div>
    </>
  )
}

export default Studentupdate
