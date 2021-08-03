const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
require("./db/conn");
const ErrorHandler = require('./helpers/error')
const port = process.env.PORT || 3000;
const app = express();
// express.json() & express.urlencoded() use for POST & PUT request ONLY !!
// NOT needed for GET or DELETE request 

// express.json() is a inbuilt method in express to recgize the incoming REQUEST object as JSON Object 
// It work as a middleware in application like app.use(express.json())
app.use(express.json());
const StudentModel = require('./models/student');

app.get('/students', async (req, res, next) => {
    try{
        // const result = new StudentModel();
        const savedData = await StudentModel.find();
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
        // res.status(404).send(error);
        res.send(new ErrorHandler(500, "Somthing went wrong", error));
    }
})
app.post('/students', async (req, res, next) => {
    try{
    console.log("=====POST request body=====>", req.body)
    if(req.body){
        const result = new StudentModel(req.body);
        const savedData = await result.save();
        console.log("-- student data saved--> ", savedData);
        // res.send("HELLO WORLD");
        if(savedData){
            let data = {studentDat : savedData }
            let data2 = { message:"Student successfully saved !!", status: true}
            res.status(201).send({...data, ...data2});
        }
        else{
            res.status(200).send(savedData);
        }
    }
    else{
        res.status(404).send({message: "No Valid Request Found !!"})
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