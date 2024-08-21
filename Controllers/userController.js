const express = require('express');
const mongoose = require('mongoose');
const Users = require ('../models/user.js');
const jwt = require('jsonwebtoken');
const { protect, admin} = require('../middleware/authMiddleware');
const BlacklistedToken = require('../models/blacklistedToken.js');

const generateToken = (id, role) => {
  return jwt.sign({ id, role },'jwt_secret_token', {
      expiresIn: '1h' //Bearer Token Expiration time
  });
};

//registerUser.............Post  //Provide JWT token
const registerUser=async(req,res)=>{
    try{
        const {username,password,role}=req.body;
        console.log(req.body);
        const userExist=await Users.findOne({username});
        if(userExist){
            return res.status(200).send('User already exists');
        }
        const user=new Users({
            username:username,
            password:password,
            role:role
        });
        await user.save();
        res.status(200).send({message:'User registered successfully...',user}); 
    }catch(error){
        res.status(500).send({message:error});
    }
  };

//Login User.....Post  //Provide JWT token
const loginUser=async (req,res)=>{
  try{
      const {username,password}=req.body
      const user=await Users.findOne({username});
    //   if(user && await user.matchPassword(password) && user.status==='active'){
        if(user && await user.matchPassword(password)){
          res.status(200).send({
              _id: user._id,
              username: user.username,
              role: user.role,
              token: generateToken(user._id, user.role),//Token generation
          });
      }
      else{
          return res.status(400).send({message:'Invalid Credentials..'});
      }
  }catch(error){
      res.status(500).send({message:error});
  }

};



const logoutUser = async (req, res) => {
    try {
      const token = req.headers['authorization']?.split(' ')[1];
      if (!token) return res.status(400).send('No token provided');
  
      // Blacklist the token
      const blacklistedToken = new BlacklistedToken({ token });
      await blacklistedToken.save();
  
      res.status(200).send('Logged out successfully');
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
};


module.exports={loginUser,registerUser,logoutUser};
