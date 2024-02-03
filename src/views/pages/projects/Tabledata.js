import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component"
import axios from 'axios';
import jwt_decode from "jwt-decode";
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

  const [projects, setProjects] = useState([]);
 const  [Filersearch, setFilterProject] = useState([]);
  const [search, setSearch] = useState("");

  const getProjects = async () => {
    try{
      const response = await axios.get('http://localhost:8800/project');
      //console.log(response.data)
      setProjects(response.data)
      setFilterProject(response.data)
    }catch (error) {
      console.log(error)
  }
 }
  const columns = [
    {
      name: "Project Name",
      selector: row => row.project_name,
      sortable: true,
    },
    {
      name: "Description",
      selector:row =>row.project_description
    },
    {
      name: "Status",
      cell: (row) => { return showRenderStatus(row.status)}
    },
    {
      name: "Action",
      cell: (row) => { return showRenderAction(row.id)}

    },


  ]

  const user = JSON.parse(localStorage.getItem('usersinfo'));
  const usertoken = user.token;
  const decded = jwt_decode(usertoken);
  const userRole = decded.role;
  //console.log(userRole)

  const [isRole,setRole]=useState(userRole)


const showRenderAction = (id) => {
  return (
    <>
      <Link to={`/projectedit/${id}`} className="btn btn-primary btn-sm">Edit</Link>
      {
        isRole ==='admin' ?
          <Link to="#" onClick={() => handleDelete(id)} className="btn btn-danger btn-sm ms-1 text-white"> Delete</Link>
          :""
      }

    </>
  )
};
const showRenderStatus = (status) => {
  if (status == 'new') {
    return <CBadge color="info" style={badge}>{status}</CBadge>;
  } else if (status == 'ongoing') {
    return <CBadge color="warning" style={badge}>{status}</CBadge>;
  } else {
    return <CBadge color="success" style={badge}>{status}</CBadge>;
  }
}

  useEffect(() => {
    getProjects();
  }, [])

  useEffect(() => {
    const result = projects.filter((project) => {
      return project.project_name.toLowerCase().match(search.toLowerCase());
    });
    setFilterProject(result)
  }, [search])


const handleDelete = async (id) => {
 try {
   await axios.delete(`http://localhost:8800/project/`+id);
   window.location.reload()
 } catch (err) {
   console.log(err);
 }
};


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
