const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
require("./db/conn");
const port = process.env.PORT || 3000;
const app = express();

const StudentModel = require('../models/student');

app.get('/student', async (req, res, next) => {

    const result = new StudentModel();
    const savedData = await result.find();
    console.log("-- Get student data -->", savedData);
    // res.send("HELLO WORLD");
})
app.post('/student', async (req, res, next) => {

    const result = new StudentModel(reg.body);
    const savedData = await result.save();
    console.log("-- student data saved--> ", savedData);
    // res.send("HELLO WORLD");
})

app.listen(port, () => {
    console.log('==== Listening On Port ====>',port);
});