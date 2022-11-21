const express = require('express');
const path = require('path');
const bodyparser = require("body-parser");
const session = require("express-session");
const {v4:uuidv4} = require("uuid");
const cookieParser = require("cookie-parser");
const router=require('./router');
const { nextTick } = require('process');
//const session = require('express-session');

const app = express();
app.use(cookieParser());
const port = process.env.port||3001;
//instaillion login form
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs');
//load static assect
app.use('/static',express.static(path.join(__dirname,'public')))
//express-session
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'key123'
    
}));
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});
app.use('/router',router);


//home route
app.get('/',(req,res)=>{
  
    res.render('base',{title:"login system"})
})


app.listen(port,()=>{
    console.log("losting to the server on http://localhost:3001")
})