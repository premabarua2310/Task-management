import express from "express";
import Routes from "./routes/Route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from 'express-session'

const app = express();
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET","PUT","DELETE"],
  credentials:true
  }
));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session(
  {
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge:1000 * 60 * 60 *24
    }
  }
));
app.use(Routes);
app.listen(8800, () => { console.log("Listing"); });


