const express = require('express');
const router= express.Router();

const data_models = require('../models/models_question.js');

// get data
router.get('/question',(req,res) =>{
    let data= data_models.get_all_data();
    res.send(data);
});
//export 
// console.log(dataModels.load_data());
module.exports =router;