const express = require('express');
const router = new express.Router();
const StudentModel = require('../models/student')


router.get('/students', async (req, res, next) => {
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
// ================== get by id ====================
router.get('/students/:id', async (req, res, next) => {
    try{
        // const result = new StudentModel();
        if(req.params?.id){
            // const savedData = await StudentModel.find({_id: req.params.id});
            const savedData = await StudentModel.findById({_id: req.params.id});
            // console.log("-- Get student data by id-->", savedData);
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
// ================== get by name =================
// router.get('/students/:name', async (req, res, next) => {
//     try{
//         // const result = new StudentModel();
//         if(req.params?.name){
//             const savedData = await StudentModel.find({name: req.params.name});
//             console.log("-- Get student data by id-->", savedData);
//             if(savedData){
//                 res.status(200).send(savedData);
//             }
//             else{
//                 res.status(200).send(savedData);
//             }
//         }
//     }
//     catch(error){
//         console.log("===Error CATCHED==>", error);
//         // res.status(404).send(error);
//         res.send(new ErrorHandler(500, "Somthing went wrong", error));
//     }
// })
// ========================== update by id =======================
router.patch('/students/:id', async (req, res, next) => {
    try{
        // const result = new StudentModel();
        if(req.params?.id){
            // const savedData = await StudentModel.find({_id: req.params.id});
            const savedData = await StudentModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
                );
            // console.log("-- Get student data by id-->", savedData);
            if(savedData){
                res.status(200).send(savedData);
            }
            else{
                res.status(404).send(savedData);
            }
        }
    }
    catch(error){
        console.log("===Error CATCHED==>", error);
        // res.status(404).send(error);
        res.send(new ErrorHandler(500, "Somthing went wrong", error));
    }
})
// ========================== update by id =======================
router.delete('/students/:id', async (req, res, next) => {
    try{
        // const result = new StudentModel();
        if(req.params?.id){
            // const savedData = await StudentModel.find({_id: req.params.id});
            const savedData = await StudentModel.findByIdAndDelete(
                req.params.id
                );
            // console.log("-- Get student data by id-->", savedData);
            if(savedData){
                let data = { sucess:true, studentData:savedData}
                res.status(200).send(data);
            }
            else{
                res.status(404).send(savedData);
            }
        }
    }
    catch(error){
        console.log("===Error CATCHED==>", error);
        // res.status(404).send(error);
        res.send(new ErrorHandler(500, "Somthing went wrong", error));
    }
})
// ========================== creation of student data =======================
router.post('/students', async (req, res, next) => {
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

module.exports = router;