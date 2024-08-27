const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/userRoutes.js');
const applications = require('./routes/applicationRoutes');
const downloadApp = require('./routes/downloadRoutes.js');
const reviews = require('./routes/reviewRoutes.js');
const notifications = require('./routes/notificationRoutes.js');

const cors = require('cors');   //TO connect it with UI React
const bodyParser=require('body-parser');  //you can use express.js directly 

const app = express();  //Creating a Router instance for creating requests.: app

//Mongodb URL. Database name: backend1
mongoose.connect('mongodb+srv://test:test@cluster0.vkjnqsh.mongodb.net/backend1?retryWrites=true&w=majority&appName=Cluster0');
    

const db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error'));
console.log('Mongodb Conneted');

const PORT = 2001;

app.listen(PORT , ()=>{
    console.log(`Mongodb Server is running on port ${PORT}`);
})

app.use(bodyParser.json());

app.use(cors({  //To connect frontend with backend
    origin: 'http://localhost:3000', // Replace with frontend's URL/Port
    methods : ["GET", "POST", "PUT", "DELETE"]  

}));


 
app.use('/users',users); 
app.use('/application',applications);
app.use('/download',downloadApp);
app.use('/review',reviews);
app.use('/notification',notifications);







