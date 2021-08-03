const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');

const port = process.env.PORT || 3000;
const app = express();

app.get('/', async (req, res, next) => {
    return "HELLO WORLD";
})

app.listen(port, () => {
    console.log('==== Listening On Port ====>',port);
});