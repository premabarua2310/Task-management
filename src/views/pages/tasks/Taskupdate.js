import React,{useState,useEffect} from 'react'
import { Link, useNavigate,useParams } from "react-router-dom";
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import moment from 'moment';
import {
  CButton,
  CRow,
  CCol,
  CCard,
  CCardHeader,CForm,CFormLabel,CFormInput,CFormTextarea,CFormSelect,
  CCardBody,
} from '@coreui/react'

const Taskupdate = () => {
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

  const navigate = useNavigate();
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [users, setUsers] = useState([]);

  const [taskName, setTaskName] = useState(null);
  const [taskPerson, setTaskPerson] = useState(null);
  const [projectName, setprojectName] = useState(null);
  const [taskStatus, setStatus] = useState(null);
  const [taskNote, settaskNote] = useState(null);
  const [taskDesc, settaskDesc] = useState(null);
  const [asssignDate, setSelectedDate] = useState(new Date());
  const [completeDate, setcompleteDatee] = useState(new Date());

  useEffect(() => {
    axios.get('http://localhost:8800/task/'+ id)
      .then(res => {
        //console.log("get data ====", res.data);
        let data = res.data[0];
      // const taskname = res.data[0].task_name;
      // const Taskerson = res.data[0].assign_user_id;
      // const projectname = res.data[0].project_id;
      // const tasknote = res.data[0].note;
      // const taskdesc = res.data[0].task_description;
      const assingdate = moment(data.asssign_date).format('yyyy-MM-DD');
      const comdate = moment(data.completed_date).format('yyyy-MM-DD');

      setTaskName(data.task_name);
      setTaskPerson(data.assign_user_id);
      setprojectName(data.project_id);
      settaskNote(data.note);
      settaskDesc(data.task_description);
      setStatus(data.status);

      setSelectedDate(moment(data.asssign_date).utcOffset('+0600').toDate());

      setcompleteDatee(moment(data.completed_date).utcOffset('+0600').toDate());
    })
    .catch(err => console.log(err))



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

  const handleUpdate = (e) => {
    // console.log(taskName)
    console.log(taskStatus)
    // console.log(projectName)
    // console.log(taskNote)
    // console.log(taskDesc)
    // console.log(asssignDate)
    // console.log(completeDate)


    e.preventDefault();
    axios.put("http://localhost:8800/task/"+id, { taskName, taskPerson, projectName, taskStatus,taskNote, taskDesc, asssignDate, completeDate } )
            .then(res => {
              //  console.log(res.data);
               navigate("/tasks");
     })
}

  return (
    <>
      <CCard className="mb-4">
   <CCardHeader>
      EDIT TASK
   </CCardHeader>
   <CCardBody>
      <CForm onSubmit={handleUpdate}>
      <CRow className="mb-3">
              <CFormLabel htmlFor="inputTask" className="col-sm-2 col-form-label">
                Task Name
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" name="task_name" id="task_name" placeholder="Enter Task Name"
                value={taskName}
                  onChange={e => setTaskName(e.target.value)} required/>

              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPerson" className="col-sm-2 col-form-label">
                Assign Person
              </CFormLabel>
              <CCol sm={10}>
              <CFormSelect aria-label="Default select example" name="assign_user_id"  id="assign_user_id" value={taskPerson} onChange={e => setTaskPerson(e.target.value)} >

                        {
                       users.map((list, index ) => (
                        <option value = {list.id} key={index}>{list.username}</option>
                        ))}
              </CFormSelect>
              </CCol>
            </CRow>


            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPerson" className="col-sm-2 col-form-label">
                Project Name
              </CFormLabel>
              <CCol sm={10}>
              <CFormSelect aria-label="Default select example" name="project_id" value={projectName} id="project_id" onChange={e => setprojectName(e.target.value)} >
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
              <CFormSelect aria-label="Default select example"value={taskStatus} name="task_status" id="task_status" onChange={e => setStatus(e.target.value)}>
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
                  Label="Enter Note"
                  placeholder="Enter Note"
                  value={taskNote}
                  onChange={e => settaskNote(e.target.value)}
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
                  value={taskDesc}
                  onChange={e => settaskDesc(e.target.value)}
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
                  label="Basic date picker"
                  name="asssign_date"
                  selected={asssignDate}
                 // onChange={e => setTask({ ...task, asssignDate: e.target.value })}
                 onChange={(date) => {

                   setSelectedDate(date);
                }}
                  dateFormat='yyyy-MM-dd'
                  showYearDropdown
                  scrollableYearDropdown

                     />

              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="" className="col-sm-2 col-form-label">
              Completed Date
              </CFormLabel>
              <CCol sm={10}>
              <DatePicker
                  label="Basic date picker"
                  name="complete_date"
                  selected={completeDate}
                  onChange={date => setcompleteDatee(date)}
                  dateFormat='yyyy-MM-dd'
                  showYearDropdown
                  scrollableYearDropdown

                />
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

export default Taskupdate
