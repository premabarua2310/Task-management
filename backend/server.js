import express from "express";


const app = express();

app.get("/", (req, res) => {
  res.json("hello ");
});

app.listen(8800, () => {
    console.log("Listing");
});



// app.use(cors({
//   origin:["http://localhost:3000"],
//   methods:["POST","GET"],
//   credentials: true
// }));

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
//       req.username = decoded.username;
//       next();
//      }

//    })

//   }

//   }

//   app.get("/", verifyUser, (req, res) => {
//   return res.json ({ Status:"Success", username: req.username})
//   });



// app.post('/login', (req, res) => {
//   console.log(req.body)



//   const sql = 'SELECT * FROM users WHERE email = ?';
//   db.query(sql, [req.body.email], (err,data) => {
//   if(err) return res.json({Error: "Login error in server"});
//   if (data.length > 0)  {
//   bcrypt.compare(req.body.password.toString(), data[0].password, (err,response) =>{
//   if (err) return res.json({Error: "Password compair error"});
//   if(response) {
// /////genarate token//
// const username = data[0].username;
// const token = jwt.sign({username},"jwt-secect-key",{expiresIn:'1d'});
// /////genarate token//

// //cookie pass
// res.cookie('token', token);

//   return  res.json({Status:"Success"});
//   }
//   else{
//   return  res.json({Error:"password not matched"});
//   }

//   })
//   }
//   else {
//   return res.json({Error: "No email"});
//   }
//   })
// })







