import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
const Taskadd = () => {
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

  const [project, setProject] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {

    async function callApiProject(){
           const apiProjectResult = await axios.get('http://localhost:8800/project/');
           setProject(apiProjectResult.data);
         }
         callApiProject();


    async function callApiUser(){
          const apiUserResult = await axios.get('http://localhost:8800/user/');
          setUsers(apiUserResult.data);
          }
          callApiUser();

  }, [])


  const [taskName, settaskName] = useState(null);
  const [taskPerson, setTaskPerson] = useState(null);
  const [projectName, setprojectName] = useState(null)
  const [taskStatus, setStatus] = useState(null)
  const [taskNote, setprojectNote] = useState(null)
  const [taskDesc, setprojectDesc] = useState(null)
  const [asssignDate, setSelectedDate] = useState(new Date());
  const [completeDate, setcompleteDatee] = useState(new Date())

  // console.log(Date);

      const [error,setError] = useState(false)
      const navigate = useNavigate();


  const handleSubmit = async (e) => {

    console.log(taskStatus)
    // console.log(taskPerson)
    // console.log(projectName)
    // console.log(taskNote)
    // console.log(taskDesc)
       e.preventDefault();
       try {
         await axios.post("http://localhost:8800/task",{taskName, taskPerson, projectName,taskStatus,taskNote,taskDesc,asssignDate,completeDate });
         navigate("/tasks");
       } catch (err) {
         console.log(err);
         setError(true)
       }
     };

  return (
    <>
      <CCard className="mb-4">
   <CCardHeader>
      ADD TASK
   </CCardHeader>
   <CCardBody>
      <CForm onSubmit={handleSubmit}>
      <CRow className="mb-3">
              <CFormLabel htmlFor="inputTask" className="col-sm-2 col-form-label">
                Task Name
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" name="task_name" id="task_name" placeholder="Enter Task Name" onChange={e => settaskName(e.target.value)} required/>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPerson" className="col-sm-2 col-form-label">
                Assign Person
              </CFormLabel>
              <CCol sm={10}>
              <CFormSelect aria-label="Default select example" name="assign_user_id"  id="assign_user_id" onChange={e => setTaskPerson(e.target.value)} required>
              <option >Please Select</option>
                        {
                       users.map((list, index ) => (
                        <option value = {list.id} key={list.id}>{list.username}</option>
                        ))}
              </CFormSelect>
              </CCol>
            </CRow>


            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPerson" className="col-sm-2 col-form-label">
                Project Name
              </CFormLabel>
              <CCol sm={10}>
              <CFormSelect aria-label="Default select example" name="project_id" id="project_id" onChange={e => setprojectName(e.target.value)}>
              <option >Please Select</option>
                        {
                       project.map((list, index ) => (
                        <option value={list.id} key={index}>{list.project_name}</option>
                        ))}
              </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPerson" className="col-sm-2 col-form-label">
                Status
              </CFormLabel>
              <CCol sm={10}>
              <CFormSelect aria-label="Default select example" name="task_status" id="task_status" onChange={e => setStatus(e.target.value)}>
              <option>Please Select</option>
              <option value="new">New</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>

              </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="inputNote" className="col-sm-2 col-form-label">
                Note
              </CFormLabel>
              <CCol sm={10}>
                <CFormTextarea
                  id="note"
                  name="note"
                  Label="Enter note"
                  placeholder="Enter Note"
                  onChange={e => setprojectNote(e.target.value)}
                  required
                ></CFormTextarea>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputNote" className="col-sm-2 col-form-label" >
                Description
              </CFormLabel>
              <CCol sm={10}>
                <CFormTextarea
                  id="task_description"
                  name="task_description"
                  Label="Enter Description"
                  placeholder="Enter Description"
                  onChange={e => setprojectDesc(e.target.value)}
                  required
                ></CFormTextarea>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="" className="col-sm-2 col-form-label">
                Assign Date
              </CFormLabel>
              <CCol sm={10}>
              <DatePicker

                      name="asssign_date"

                      selected={asssignDate}
                     onChange={ date => setSelectedDate(date)}
                     dateFormat='yyyy-MM-dd'
                     showYearDropdown
                  scrollableYearDropdown
                  label="Basic date picker"
                     />
                {/* <div>
                  <input className="form-control" type="date" id="asssign_date"  dateFormat='yyyy-MM-dd' name="asssign_date" onChange={ date => setSelectedDate(date)}/>
                </div> */}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="" className="col-sm-2 col-form-label">
                Completed Date
              </CFormLabel>
              <CCol sm={10}>
              <DatePicker
                  label="Basic date picker"
                  name="complete-date"
                  selected={completeDate}
                  onChange={date => setcompleteDatee(date)}
                  dateFormat='yyyy-MM-dd'
                  showYearDropdown
                  scrollableYearDropdown

                />

                {/* <div>
                  <input className="form-control" type="date" id="completeDate"  name="completeDate" onChange={ date => setcompleteDatee(date)}/>
                </div> */}
              </CCol>
            </CRow>
         <CRow className="mt-4">
            <CCol className="mb-3 d-flex justify-content-center">
               <CButton style={{ width: '10rem',marginRight: "10px" }} type="submit">Submit</CButton>
               <Link to={'/tasks'}><CButton style={{ width: '10rem',color:'white' }} color="danger">Cancel</CButton></Link>
            </CCol>
         </CRow>
      </CForm>
   </CCardBody>
</CCard>
    </>
  )
}

export default Taskadd
