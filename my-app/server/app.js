const dotenv=require('dotenv');
const mongoose=require('mongoose');
const express =require('express');
const cors = require('cors');
const app=express();
dotenv.config({path:'./config.env'});
require('./db/conn');
const cron =require('node-cron');
app.use(express.json());
app.use(cors({origin:true}));
const PORT=process.env.PORT;

// const User=require('./models/userSchema');
app.use(require('./routes/auth'));


// middleware checks the neccesary steps and authentication
// between the routes eg .. if i want to go to about section 
//  then before giving the client actual about page i as a developer
// wants the user to be logined first so i can setup a middleware between 
// the home page and the about page which checks 
// whether the user is logined or not . 

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})

// cron.schedule('* * * * * *',()=>{
//     console.log('running the task');
// })
