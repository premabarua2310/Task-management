import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component"
import axios from 'axios';
import jwt_decode from "jwt-decode";
import moment from 'moment'
import {
  CBadge
} from '@coreui/react'

const Tabledata = () => {
  const badge = {
    padding: '8px 8px',
    textAlign:'center',
    borderRadius: '5px',
    fontSize: '12px',
  };
  const [tasks, setTasks] = useState([]);
  const  [Filersearch, setFilerTask] = useState([]);
  const [search, setSearch] = useState("");





  const user = JSON.parse(localStorage.getItem('usersinfo'));
  const usertoken = user.token;
  const decded = jwt_decode(usertoken);
  const userRole = decded.role;
  const userid = decded.uid;
  // console.log(decded)
  // console.log(decded.uid)
  // console.log(decded.role)


  const getTasks = async () => {
    try{
      const response = await axios.get(`http://localhost:8800/getuserstask/`+userid);

      //console.log(response.data)
      setTasks(response.data)
      setFilerTask(response.data)
    }catch (error) {
      console.log(error)
  }
 }
  const columns = [
    {
      name: "Task Name",
      selector: row => row.task_name,
      sortable: true,
    },
    {
      name: "Description",
      selector:row =>row.task_description
    },
    {
      name: "Assigned Person",
      selector:row =>row.username
    },
    {
      name: "Status",
      cell: (row) => { return showRenderStatus(row.status)}
    },
    {
      name: "Assigned Date",
      //selector: row => row.asssign_date
      cell: (row) => { return showRenderDate(row.asssign_date)}
    },
    {
      name: "Completed Date",
      //selector: row => row.completed_date
      cell: (row) => { return showRenderDate(row.completed_date)}
    },
    {
      name: "Action",
      cell: (row) => { return showRenderAction(row.id)}
    },


  ]


const [isRole,setRole]=useState(userRole)
const showRenderAction = (id) => {
  return (
    <>
      <Link to={`/edituserstask/${id}`} className="btn btn-primary btn-sm">Edit</Link>
      {/* {
        isRole ==='admin' ?
        <Link to="#"  onClick={() => handleDelete(id) } className="btn btn-danger btn-sm ms-1">Delete</Link>
          :""
      } */}

    </>
  )
};
const showRenderDate = (date) => {
  return (
    moment(date).format('ll')
  )
};
const showRenderStatus = (status) => {
  if (status == 'new') {
    return <CBadge color="primary" style={badge}>{status}</CBadge>;
  } else if (status == 'ongoing') {
    return <CBadge color="warning" style={badge}>{status}</CBadge>;
  } else {
    return <CBadge color="success" style={badge}>{status}</CBadge>;
  }
}

  useEffect(() => {
    getTasks();
  }, [])

  useEffect(() => {
    const result = tasks.filter((task) => {
      return task.task_name.toLowerCase().match(search.toLowerCase());
    });
    setFilerTask(result)
  }, [search])


// const handleDelete = async (id) => {
//  try {
//    await axios.delete(`http://localhost:8800/userstask/`+id);
//    window.location.reload()
//  } catch (err) {
//    console.log(err);
//  }
// };


  return (

    <DataTable
      columns={columns}
      data={Filersearch}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="450px"
      subHeader
      subHeaderComponent={
        <input
          type='text'
          placeholder="Searce Here"
          className='w-25 form-control'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }

    />

  );

}

export default Tabledata;
