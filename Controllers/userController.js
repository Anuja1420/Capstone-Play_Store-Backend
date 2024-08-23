const express = require('express');
const mongoose = require('mongoose');
const Users = require ('../models/user.js');
const jwt = require('jsonwebtoken');
const { protect, admin} = require('../middleware/authMiddleware');
const BlacklistedToken = require('../models/blacklistedToken.js');

const generateToken = (id, role) => {
  return jwt.sign({ id, role },'jwt_secret_token', {  //JWT Token
      expiresIn: '1h' //Bearer Token Expiration time
  });
};

//registerUser.............Post  //Provide JWT token
const registerUser=async(req,res)=>{
    try{
        const {username,password,role}=req.body;
        // console.log(req.body);
        const userExist=await Users.findOne({username});
        if(userExist){
            return res.status(200).send('User already exists');
        }
        const user=new Users({
            username:username,
            password:password,
            role:role
            // notifications: []
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
              // notifications: user.notifications, // Add this line to include notifications
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


//Logout User  //Provide bearer token 
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

//Get User Profile..........Get //Provide admin Bearer Token and userId in path
const getUserProfile = async (req, res) => {
  try{
      const user = await Users.findById(req.user.id);
      if (user) {
          res.status(200).send({
              _id: user._id,
              username: user.username,
              role: user.role,
              Status: user.status
          });
      } else {
          res.status(404).send({ message: 'User not found' });
      }
  }catch(error){
      res.status(500).send({message:error});
  }
};

//Get All Users......Get  //Admin can get all users by admin token
const getAllUsers= async (req,res)=>{
  try{
      const users = await Users.find();
      res.status(200).send(users);
  }catch(error){
      res.status(500).send({message:error});
  }
};

//Get User By Id....Get  //Admin can get users by userId --> admin token
const getUserById= async (req,res)=>{
  try{
      const user = await Users.findById(req.params.id);
      if(!user){
          return res.status(404).send({message:'User not found'});
      }
      res.status(200).send(user);
  }catch(error){
      res.status(500).send({message:error});
  }
};


//Delete User By Id.........Delete //Only admin can delete user  --> admin token
const deleteUserById = async (req,res)=>{
  try{
      const user = await Users.findByIdAndDelete(req.params.id);
      if(!user){
          return res.status(404).send({message:'User not found'});
      }
      // res.status(200).send(user);
      res.send('User deleted Successfully');
  }catch(error){
      res.status(500).send({message:error});
  }
};

//Deactivate User.........Put //Only admin can deactivate user --> admin token
const deactivateUser= async (req,res)=>{
  try{
      const user = await Users.findByIdAndUpdate(req.params.id , { status:'inactive' }, {new:true}); //Find users by id and make them inactive.
      if(!user){
          return res.status(404).send({message:'User not found'});
      }
      res.send({message:"User Deactivated",user});
  }catch(error){
      res.status(500).send({message:error});
  }
};

//Activate User.........Put  //Only admin can activate user --> admin token
const activateUser = async (req,res)=>{
  try{
      const user = await Users.findByIdAndUpdate(req.params.id , { status:'active' }, {new:true});//Find users by id and make them active.
      if(!user){
          return res.status(404).send({message:'User not found'});
      }
      res.send({message:"User Activated",user});
  }catch(error){
      res.status(500).send({message:error});
  }
};


module.exports={loginUser,registerUser,logoutUser,getUserProfile,getAllUsers,getUserById,deleteUserById,deactivateUser,activateUser};
