const express=require("express");
const cors=require("cors");
const { connection } = require("./db");
const { userController } = require("./controller/userController");
const { investmentController } = require("./controller/investmentController");
const { authentication } = require("./middleware/authentication");
const { profileController } = require("./controller/profileController");

const app=express();
app.use(cors());
require("dotenv").config();

app.use(express.json());
app.use("/auth",userController);
app.use(authentication);
app.use("/investment",investmentController,authentication);
 app.use("/profile",profileController,authentication)

app.get("/",(req,res)=>{
    res.send("Grow Calculator");
});

app.listen(3000,async()=>{
    try {
       await connection
       console.log("Connected to DataBase(MongoDB)");
    } catch (error) {
        console.log(err);
        console.log("error while connecting to DataBase(MongoDB)");
      }
      console.log(`App is running on port 3000`);
    });