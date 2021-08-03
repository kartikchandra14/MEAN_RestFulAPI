const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: [3, "Atleast, three character must be in name !!"],
        maxlength: [60, "Maximum character allowed is 60 Only !!"]
    },
    class: {
        type: Number
    },
    rollNo: {
        type: Number,
        unique: true, 
        required: true
    },
    email: {
        type: String,
        unique: true, 
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },
    mobile:{
        type:Number,
        minlength: 10,
        maxlength:10
    },
    address:{
        type:String,
    }
    createdAt: {
        type: Date,
        default: new Date.now()
    },

})