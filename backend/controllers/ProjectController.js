import db from "../config/Database.js";

//get all projects
export const getProjects = async(req, res)=>{
    const sql = "SELECT * FROM projects";
    db.query(sql, (err,data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
}

//insert projects
export const saveProject = async(req, res)=>{
        const sql = "INSERT INTO projects(`project_name`, `project_description`,status) VALUES (?)";
        const values = [
          req.body.project_name,
          req.body.project_description,
          req.body.project_status,
        ];
      console.log(values)
        db.query(sql, [values], (err, data) => {
          if (err) return res.send(err);
          return res.json(data);
        });
    }


//edit projects
export const getProjectById = async(req, res)=>{
        const sql = "SELECT * FROM projects WHERE id = ? ";
          const id = req.params.id;
          db.query(sql,[id], (err,data) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
            return res.json(data);
          });
}

//update projects
export const updateProject = async (req, res) => {
  console.log(req.params.id);
        const sql = "UPDATE projects SET `project_name`= ?, `project_description`= ?, `status`= ? WHERE id=?";
          const id = req.params.id;
          db.query(sql, [ req.body.project_name, req.body.project_description ,req.body.project_status, id], (err, result) => {
            if (err) return res.json(err);
            return res.json(result);
            console.log(result)
          });
}

//delete projects
export const deleteProject = async(req, res)=>{
        const projectId = req.params.id;
        const q = " DELETE FROM projects WHERE id = ? ";

        db.query(q, [projectId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
        });
}




