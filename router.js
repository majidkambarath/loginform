var express = require("express");
var router = express.Router();

const credential ={
    email:"majid@gmail.com",
    password:"majid123"
}

//login user 
router.post('/login',(req,res)=>{
    if(req.body.email == credential.email && req.body.password==credential.password){
     req.session.user=req.body.email;
     res.redirect('/router/dashboard');
    //res.end('login successful...!!')
    }else{
       res.redirect('/')
    }
});

//router for dashboard
router.get('/dashboard',(req,res)=>{
    
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }
})
//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log('Error');
        }else{
            res.render('base',{title:express,logut:'logout successfully!!'})
        }
    })
})
module.exports=router;