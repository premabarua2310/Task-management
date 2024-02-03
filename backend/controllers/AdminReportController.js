import db from "../config/Database.js";
import express from "express";
import cors from "cors";
import moment from 'moment'


export const getAdminTask = async(req, res)=>{

  let start_date = moment(req.body.asssignDate).utcOffset('+0600').format('yyyy-MM-DD');
  let end_date = moment(req.body.completeDate).utcOffset('+0600').format('yyyy-MM-DD');

  let sql = "SELECT t.*, p.project_name, u.username  FROM tasks AS t, projects AS p, users AS u WHERE t.project_id = p.id AND t.assign_user_id = u.id AND t.completed_date >='" + start_date + "' AND t.completed_date   <= '" + end_date +"'";

  if (req.body.projectName) {
    sql +=" AND p.id =" + req.body.projectName;
  }


  if (req.body.taskPerson) {
    sql +=" AND u.id =" + req.body.taskPerson;
  }


  if (req.body.taskStatus) {
    sql +=" AND t.status ='" + req.body.taskStatus + "'";
  }


  db.query(sql, (err,data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  })

}



