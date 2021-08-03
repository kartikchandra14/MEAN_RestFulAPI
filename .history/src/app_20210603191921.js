const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
require("./db/conn");
const port = process.env.PORT || 3000;
const app = express();

app.get('/student', async (req, res, next) => {
    res.send("HELLO WORLD");
})

app.listen(port, () => {
    console.log('==== Listening On Port ====>',port);
});