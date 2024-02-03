import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Projects = React.lazy(() => import('./views/pages/projects/Project'))
const ProjectAdd = React.lazy(() => import('./views/pages/projects/Projectadd'))
const Projectupdate = React.lazy(() => import('./views/pages/projects/Projectupdate'))


const Tasks = React.lazy(() => import('./views/pages/tasks/Task'))
const Taskadd = React.lazy(() => import('./views/pages/tasks/Taskadd'))
const Taskupdate = React.lazy(() => import('./views/pages/tasks/Taskupdate'))

const usersTasks = React.lazy(() => import('./views/pages/tasks/usertask/UserTask'))
const usersTaskadd = React.lazy(() => import('./views/pages/tasks/usertask/UserTaskadd'))
const usersTaskupdate = React.lazy(() => import('./views/pages/tasks/usertask/UserTaskupdate'))

const Users = React.lazy(() => import('./views/pages/users/User'))
const Usersadd = React.lazy(() => import('./views/pages/users/Useradd'))
const AdimReport = React.lazy(() => import('./views/pages/reports/adminreport/AdminReport'))
const UserReport = React.lazy(() => import('./views/pages/reports/uesrreport/UserReport'))
const UserProfile = React.lazy(() => import('./views/pages/userprofile/UserProfile'))
const UserProfileById = React.lazy(() => import('./views/pages/userprofile/UserProfileById'))


const Product = React.lazy(() => import('./views/pages/product/Product'))
const Productadd = React.lazy(() => import('./views/pages/product/Productadd'))
const Productupdate = React.lazy(() => import('./views/pages/product/Productupdate'))

const Student = React.lazy(() => import('./views/pages/students/Student'))
const Studentadd = React.lazy(() => import('./views/pages/students/Studentadd'))
const Studentupdate = React.lazy(() => import('./views/pages/students/Studentupdate'))

const Profile = React.lazy(() => import('./views/pages/profile/Profile'))
const ProfileAdd = React.lazy(() => import('./views/pages/profile/Profileadd'))

const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/projects', name: 'Projects', element: Projects },
  { path: '/addproject', name: 'Add Project', element: ProjectAdd },
  { path: '/projectedit/:id', name: 'Edit Project', element: Projectupdate },
  { path: '/tasks', name: 'Tasks', element: Tasks },
  { path: '/addtask', name: 'Add Task', element: Taskadd },
  { path: '/edittask/:id', name: 'Edit Task', element: Taskupdate },
  { path: '/getuserstask', name: 'User Tasks', element: usersTasks },
  { path: '/adduserstask', name: 'Add Users Task', element: usersTaskadd },
  { path: '/edituserstask/:id', name: 'Edit Users Task', element: usersTaskupdate },
  {path:  '/users', name: 'Users', element: Users},
  { path: '/adduser', name: 'Add User', element: Usersadd },
  {path:  '/adminreport', name: 'Admin User', element: AdimReport},
  { path: '/userreport', name: 'Users', element: UserReport },
  { path: '/userprofile', name: 'User Profile', element: UserProfile },
  { path: '/userprofilechange/:id', name: 'Update Password', element: UserProfileById },

  { path: '/student', name: 'Student', element: Student },
  { path: '/addstudent', name: 'Add Student', element: Studentadd },
  { path: '/editstudent/:id', name: 'Edit Student', element: Studentupdate },

  { path: '/profile', name: 'Profile', element: Profile },
  
  { path: '/addprofile', name: 'Add Profile', element: ProfileAdd },
]

export default routes
