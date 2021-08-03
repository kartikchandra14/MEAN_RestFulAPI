const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
require("./db/conn");
const { ErrorHandler } = require('./helpers/error')
const studentRoutes = require("./routers/student")
const port = process.env.PORT || 3000;
const app = express();
// express.json() & express.urlencoded() use for POST & PUT request ONLY !!
// NOT needed for GET or DELETE request 

// express.json() is a inbuilt method in express to recgize the incoming REQUEST object as JSON Object 
// It work as a middleware in application like app.use(express.json())
app.use(express.json());
// const StudentModel = require('./models/student');
app.use(studentRoutes);

app.listen(port, () => {
    console.log('==== Listening On Port ====>',port);
});