import db from "../config/Database.js";
import express from "express";
import cors from "cors";
import moment from 'moment'

// const app = express();
// app.use(express.json());
// app.use(cors());


export const getTask = async(req, res)=>{
    const sql = "SELECT t.*, u.username, u.id as uid, p.id AS pid, p.project_name FROM tasks AS t, users AS u, projects AS p WHERE t.assign_user_id= u.id AND t.project_id = p.id";
    db.query(sql, (err,data) => {
        if (err) {
        console.log(err);
        return res.json(err);
        }
        return res.json(data);
    });
}

export const saveTasks = async(req,res)=>{

  //console.log(req.body.taskName);

    const sql = "INSERT INTO tasks(`task_name`, `assign_user_id`, `project_id`,status,`task_description`, `note`, `asssign_date`, `completed_date`) VALUES (?)";
      const values = [
        req.body.taskName,
        req.body.taskPerson,
        req.body.projectName,
        req.body.taskStatus,
        req.body.taskNote,
        req.body.taskDesc,
        moment(req.body.asssignDate).utcOffset('+0600').format('yyyy-MM-DD'),
        moment(req.body.completeDate).utcOffset('+0600').format('yyyy-MM-DD'),
        //req.body.asssignDate,
        //req.body.completeDate,
        // req.body.user_id,
      ];
  //console.log(values)

      db.query(sql, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
}

export const getTaskById = async(req, res)=>{
    const sql = "SELECT t.*, u.username, u.id as uid, p.id AS pid, p.project_name FROM tasks AS t, users AS u, projects AS p WHERE t.assign_user_id= u.id AND t.project_id = p.id AND t.id  = ? ";
    const id = req.params.id;
    db.query(sql,[id], (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
}



export const updateTask = async (req, res) => {

  const sql = "UPDATE tasks SET `task_name`= ?, `assign_user_id`= ? , `project_id`= ?,`status`= ?,`note`= ?, `task_description`=?, `asssign_date`= ?, `completed_date`= ? WHERE id = ?";
  const id = req.params.id;
  const values = [
    req.body.taskName,
    req.body.taskPerson,
    req.body.projectName,
    req.body.taskStatus,
    req.body.taskNote,
    req.body.taskDesc,
    moment(req.body.asssignDate).utcOffset('+0600').format('yyyy-MM-DD'),
    moment(req.body.completeDate).utcOffset('+0600').format('yyyy-MM-DD'),
    id,
  ];

    db.query(sql, [...values], (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
}


export const deleteTask = async(req, res)=>{
    const taskId = req.params.id;
    const q = " DELETE FROM tasks WHERE id = ? ";

    db.query(q, [taskId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
}


