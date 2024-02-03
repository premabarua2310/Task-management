import db from "../config/Database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from 'path';
const salt = 10;
// require('dotenv').config()
// eslint-disable-next-line import/first
import 'dotenv/config'

//const secretkey = "Bijoy*7890!@#657$";
const secretkey = process.env.SECRET_KEY;



export const loginUser = async (req, res) => {
  //console.log(req.body.email);
  //console.log(req.body.password);

  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [req.body.email], (err,data) => {
    if (err) return res.json({Error: "Wrong Email Inserted"});
  if (data.length > 0)  {
  bcrypt.compare(req.body.password.toString(), data[0].password, (err,response) =>{
    if (err) return res.json({Error:"Wrong Password Inserted"});
    if (response) {
      const token = jwt.sign({username: data[0].username, uid: data[0].id, role:data[0].userrole,userpic:data[0].profilepic,useremail:data[0].email},secretkey,{expiresIn:'4h'});
      return res.json({ status: true, token: token });
  }
  else{
    return res.json({ status: false, token: ''})
  }
  })
  } else{
    return res.json({ status: false, token: ''})
  }
  })
}








const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/')
  },
   // pathname:'http://localhost/public/images/',
    filename: (req, file, cb) => {
        //cb(null, pathname + file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

const upload = multer({
    storage: storage
});

const upload_profile = upload.single('profilepic');

// get all user
export const getUser = async(req, res)=>{
    const sql = "SELECT * FROM users";
    db.query(sql, (err,data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
}


// Save user
export const saveUser = async (req, res) => {
  upload_profile(req, res, function (err) {
    let file_name = '';
    if (req.file) {
      file_name = req.file.filename;
    }
    const sql = "INSERT INTO users(`username`, `email`,`password`,`userrole`, `profilepic`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(),salt, (err,hash) => {
    if (err) return res.json({ Error: "Error for hashing password" })
    const values = [
      req.body.username,
      req.body.email,
      //req.body.password,
      hash,
      req.body.userrole,
      file_name
    ]

    // console.log(values)
    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "data error" });
      return res.json({ Status: "Success" });
    });
    })





  });

}


export const updateUserPassword = async (req, res) => {
  const sql = "UPDATE users SET `password` = ? WHERE id = ?";

  bcrypt.hash(req.body.userPassword.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" })
    const values = [
      hash,
      req.body.userId,
    ]
    db.query(sql, [...values], (err, result) => {
      if (err) return res.json({ Error: "data error" });
      return res.json({ Status: "Success" });
    });
  })
}

export const updateUserPasswordById = async (req, res) => {
  const id = req.params.id;
  //console.log(id);
  const sql = "UPDATE users SET `password` = ? WHERE id = ?";
  bcrypt.hash(req.body.userPassword.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" })
    const values = [
      hash,
      id,
    ]
    //console.log(values);
    db.query(sql, [...values], (err, result) => {
      if (err) return res.json({ Error: "data error" });
      return res.json({ Status: "Success" });
    });
  })
}
































// export const loginUser = async (req, res) => {
//   // console.log(req.body);
//   const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
//   const values = [
//     req.body.email,
//     req.body.password
//   ]
//   //console.log(values);
//   db.query(sql, [...values],(err, result) => {
//     if (err) return res.json(err);
//     if (result.length > 0) {
//       req.session.username = result[0].username;
//       console.log(req.session.username);
//       // return res.json({ Login: true,username:req.session.username })
//       return res.json({ Login: true})
//     }
//     else {
//       return res.json({Login: false})
//     }
//   })
// }

// export const loginUser = async (req, res) => {
//   // console.log(req.body);
//   const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
//   const values = [
//     req.body.email,
//     req.body.password
//   ]
//   console.log(values);
//   db.query(sql, [...values],(err, result) => {
//     if (err) return res.json(err);
//     if (result.length > 0) {
//       req.session.username = result[0].username;
//       console.log(req.session.username);
//       const token = jwt.sign({username: result[0].username, uid: result[0].id, role:result[0].userrole},secretkey,{expiresIn:'4h'});
//       // return res.json({ Login: true,username:req.session.username })
//       return res.json({ status: true, token: token})
//     }
//     else {
//       return res.json({status: false, token: ''})
//     }
//   })
// }



// export const getAuthUser = async (req, res) => {
//   if (req.session.username) {
//    return res.json({valid: true, username:req.session.username})
//   } else {
//     return res.json({ valid: false})
//  }
// }

// export const userLogout = async (req, res) => {
//   if (req.session) {
//     req.session.destroy(err => {
//       if (err) {
//         res.status(400).send('Unable to log out')
//       } else {
//         res.send('Logout successful')
//       }
//     });
//   } else {
//     res.end()
//   }
// }


// const verifyUser = (req, res, next) => {
//   const token =req.cookies.token;

//   if (!token) {
//     return res.json ({ Message:"We need token, please provide it.Login Now"})
//   }

//   else

//    {
//    jwt.verify(token, "jwt-secect-key", (err, decoded) =>{

//      if(err){
//       return res.json ({ Message:"Authentication Error!!!"})
//      }
//      else{
//       req.name = decoded.name;
//       next();
//      }

//    })

//   }

// }



// export const loginUserVeryfy = async (req, res) => {
//   verifyUser(req, res, function (err) {
//     return res.json({ Status: "Success", name: req.username })

//   });
// }


