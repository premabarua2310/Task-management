import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component"
import axios from 'axios';
import jwt_decode from "jwt-decode";

const Tabledata = (data) => {
  //console.log(data);



  const customStyles = {

    headCells: {
        style: {
            zIndex:0,

        },
    },

};

  const columns = [
    {
      name: "Task Name",
      selector: row => data.task_name,
      sortable: false,
    },
    {
      name: "Status",
      selector:row =>(`<h1 classNmae="text-white">{data.status}<h1>`)
    },
    {
      name: "Cmpleted Date",
      selector:row =>data.completed_date
    },
    {
      name: "Assigned Person Name",
      selector:row =>data.username
    },
    {
      name: "Project Name",
      selector:row =>data.project_name
    },


  ]

  return (

    <DataTable
      customStyles={customStyles}
      columns={columns}
      data={data}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="450px"


    />

  );

}

export default Tabledata;
