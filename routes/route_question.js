const express = require('express');
const router= express.Router();

const data_models = require('../models/models_question.js');

// get data
router.get('/question',(req,res) =>{
    let data= data_models.get_all_data();
    res.send(data);
});


// add data
router.post('/',(req,res)=>{
    let question = req.body.question;
    let answer_a = req.body.answer_a;
    let answer_b = req.body.answer_b;
    let answer_c = req.body.answer_c;
    let answer_d = req.body.answer_d;
    let data = data_models.add_questions(question,answer_a,answer_b,answer_c,answer_d);
    res.status(200).send({"MESSAGE":"SUCCESSFULL !"})
})






//export 
// console.log(dataModels.load_data());
module.exports =router;