import express from "express";
import {getProjects, saveProject, getProjectById, updateProject, deleteProject} from "../controllers/ProjectController.js";
import {getTask,saveTasks,getTaskById,updateTask,deleteTask} from "../controllers/TaskController.js";
import {getuserTask,saveuserTasks,getuserTaskById,updateuserTask} from "../controllers/UserTaskController.js";
import {getUser,saveUser,loginUser,updateUserPassword,updateUserPasswordById} from "../controllers/UsersController.js";
import {getAdminTask} from "../controllers/AdminReportController.js";
import {getUserTask} from "../controllers/UserReportController.js";

const router = express.Router();
//project
router.get('/project', getProjects);
router.post('/project', saveProject);
router.get('/project/:id', getProjectById);
router.put('/project/:id', updateProject);
router.delete('/project/:id', deleteProject);


//users

//router.get('/', getAuthUser);
router.post('/login', loginUser);
// router.delete('/logout', userLogout);
// router.get('/', loginUserVeryfy);
router.get('/user', getUser);
router.post('/user', saveUser);
// router.get('/user/:id', getUserById);
 router.put('/changepass', updateUserPassword);
 router.put('/changepassbyid/:id', updateUserPasswordById);
// router.delete('/user/:id', deleteUser);


//task
router.get('/task', getTask);
router.post('/task', saveTasks );
router.get('/task/:id', getTaskById);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);



//usertask
router.get('/getuserstask/:id', getuserTask);
router.post('/userstask', saveuserTasks );
router.get('/userstask/:id', getuserTaskById);
router.put('/userstask/:id', updateuserTask);
//router.delete('/userstask/:id', deleteuserTask);



//admin report
router.post('/adminreport', getAdminTask);
router.post('/userreport', getUserTask);





export default router;
