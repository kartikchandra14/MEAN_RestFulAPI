const mongoose = require('mongoose');
const urlForMongo =  "mongodb://localhost:27017/studentdb"
mongoose.connect(urlForMongo, {useNewUrlParser : true, useUnifiedTopology : true}).then(() => {
    console.log(`Connection is successfull with studentdb`);
}).catch((error) => {
    console.log('=== Error While Connecting with studentdb ==>', error);
});