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
        if(savedData){
            res.status(200).send(savedData);
        }
        else{
            res.status(200).send(savedData);
        }
    }
    catch(error){
        console.log("===Error CATCHED==>", error);
        res.status(404).send(error);
    }
})
app.post('/students', async (req, res, next) => {
    try{
    const result = new StudentModel(req.body);
    const savedData = await result.save();
    console.log("-- student data saved--> ", savedData);
    // res.send("HELLO WORLD");
    if(savedData){
        res.status(201).send(savedData);
    }
    else{
        res.status(200).send(savedData);
    }
    }
    catch(error){
        console.log("===Error CATCHED==>", error);
        res.status(404).send(error);
    }
})

app.listen(port, () => {
    console.log('==== Listening On Port ====>',port);
});