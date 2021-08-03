const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
require("./db/conn");
const port = process.env.PORT || 3000;
const app = express();

const StudentModel = require('./models/student');

app.get('/students', async (req, res, next) => {
    try{
        const result = new StudentModel();
        const savedData = await result.find();
        console.log("-- Get student data -->", savedData);
        // res.send("HELLO WORLD");
    }
    catch(error){
        console.log("===Error CATCHED==>", error);
    }
})
app.post('/students', async (req, res, next) => {
    try{
    const result = new StudentModel(res.body);
    const savedData = await result.save();
    console.log("-- student data saved--> ", savedData);
    // res.send("HELLO WORLD");
    
    }
    catch(error){
        console.log("===Error CATCHED==>", error);
    }
})

app.listen(port, () => {
    console.log('==== Listening On Port ====>',port);
});