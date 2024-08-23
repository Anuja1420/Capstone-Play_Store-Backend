const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/userRoutes.js');
const applications = require('./routes/applicationRoutes');
//const notifications = require('./routes/notificationRoutes');
const cors = require('cors');   //TO connect it with UI React
const bodyParser=require('body-parser');  //you can use express.js directly 

const app = express();  //Creating a Router instance for creating requests.: app

mongoose.connect('mongodb+srv://test:test@cluster0.vkjnqsh.mongodb.net/backend1?retryWrites=true&w=majority&appName=Cluster0');
    

const db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error'));
console.log('Mongodb Conneted');

// const PORT = 3003;
const PORT = 2001;

app.listen(PORT , ()=>{
    console.log(`Mongodb Server is running on port ${PORT}`);
})

app.use(bodyParser.json());
// app.use(cors());
app.use(cors({  //To connect frontend with backend
    origin: 'http://localhost:3000', // Replace with your frontend's URL/Port
    methods : ["GET", "POST", "PUT", "DELETE"]  

}));


 
app.use('/users',users); 
app.use('/application',applications);
//app.use('/notification',notifications);







//to run this
//Install ---> npm install 
//npm install express mongoose
//npm install cors
//npm install body-parser
//npx nodemon index.js


//If the app is crashing
//Go to Mongodb Atlas on chrome
//Go to network access
//Add Ip Address
//Click on connect anywhere