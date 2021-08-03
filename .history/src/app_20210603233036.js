const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
require("./db/conn");
const { ErrorHandler } = require('./helpers/error')
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
        const savedData = await StudentModel.find().limit(12);
        console.log("-- Get student data -->", savedData);
        // res.send("HELLO WORLD");
        if(savedData){
            let data = { studentData : savedData, count: savedData?.length }
            res.status(200).send(data);
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
app.get('/students/:id', async (req, res, next) => {
    try{
        // const result = new StudentModel();
        if(req.params?.id){
            // const savedData = await StudentModel.find({_id: req.params.id});
            const savedData = await StudentModel.findById({_id: req.params.id});

            console.log("-- Get student data by id-->", savedData);
            if(savedData){
                res.status(200).send(savedData);
            }
            else{
                res.status(200).send(savedData);
            }
        }
    }
    catch(error){
        console.log("===Error CATCHED==>", error);
        // res.status(404).send(error);
        res.send(new ErrorHandler(500, "Somthing went wrong", error));
    }
})
app.get('/students/:name', async (req, res, next) => {
    try{
        // const result = new StudentModel();
        if(req.params?.name){
            const savedData = await StudentModel.find({name: req.params.name});
            console.log("-- Get student data by id-->", savedData);
            if(savedData){
                res.status(200).send(savedData);
            }
            else{
                res.status(200).send(savedData);
            }
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
            let data = {studentData : savedData }
            let data2 = { message:"Student successfully saved !!", status: true}
            res.status(201).json({...data, ...data2});
        }
        else{
            res.status(200).json(savedData);
        }
    }
    else{
        res.status(404).send({message: "No Valid Request Found !!"})
    }
    }
    catch(err){
        console.log("===Error CATCHED==>", err);
        // res.status(404).send(error);
        // res.send(new ErrorHandler(500, "Somthing went wrong", error));
        next(new ErrorHandler(500, "Something went wrong", err))
        // res.status(500);
        // res.render('error', { error: err })
    }
})

app.listen(port, () => {
    console.log('==== Listening On Port ====>',port);
});