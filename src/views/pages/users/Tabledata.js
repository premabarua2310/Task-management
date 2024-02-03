import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component"
import axios from 'axios';

const Tabledata = () => {

  const [users, setUser] = useState([]);
 const [Filersearch, setFilerUser] = useState([]);
  const [search, setSearch] = useState("");

  const getUsers = async () => {
    try{
      const response = await axios.get('http://localhost:8800/user');
      console.log(response.data)
      setUser(response.data)
      setFilerUser(response.data)
    }catch (error) {
      console.log(error)
  }
 }
  const columns = [
    {
      name: "User Name",
      selector: row => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector:row =>row.email
    },
    {
      name: "Status",
      selector:row =>row.status
    },
    // {
    //   name: "Action",
    //   selector:row =>row.status
    // },
    {
      name: "Action",
      cell: (row) => { return showRenderAction(row.id)}

    },


  ]

const showRenderAction = (id) => {
  return (
    <>
      <Link to={`/userprofilechange/${id}`} className="btn btn-info btn-sm ms-1 text-white"> Change Password</Link>
    </>
  )
};


  useEffect(() => {
    getUsers();
  }, [])

  useEffect(() => {
    const result = users.filter((user) => {
      return user.username.toLowerCase().match(search.toLowerCase());
    });
    setFilerUser(result)
  }, [search])


const handleDelete = async (id) => {
 try {
   await axios.delete(`http://localhost:8800/user/`+id);
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
