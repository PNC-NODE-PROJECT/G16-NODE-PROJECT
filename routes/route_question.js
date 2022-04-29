const express = require('express');
const router= express.Router();

const data_models = require('../models/models_question.js');

// get question
router.get('/question',(req,res) =>{
    let data= data_models.get_all_question();
    res.send(data);
});
// add question
router.post('/add_question',(req,res)=>{
    let question = req.body.question;
    let answer_a = req.body.answer_1;
    let answer_b = req.body.answer_2;
    let answer_c = req.body.answer_3;
    let answer_d = req.body.answer_3;
    let correct_answer = req.body.correct_answer;
    data = data_models.add_questions(question,answer_a,answer_b,answer_c,answer_d,correct_answer);
    res.status(200).send({"MESSAGE":"SUCCESSFULL !"})
})

// delete question

router.delete('/delete_question/:id', (req, res) => {
    let id = req.params.id
    let delete_question = data_models.remove_question(id)
    
    if (delete_question) {
        res.status(200).send({
            "message": 'question deleted successfully'
        })
    } else {
        res.status(404).send({
            "message": 'question id not found'
        })
    }
})

router.patch('/question/:id',(req,res)=>{
    let edit_id = req.params.id;
    let edit_question = req.body.question;
    let edit_answer_a = req.body.answer_1;
    let edit_answer_b = req.body.answer_2;
    let edit_answer_c = req.body.answer_3;
    let edit_answer_d = req.body.answer_3;
    let edit_correct_answer = req.body.correct_answer;
    data = data_models.edit_question(edit_id,edit_question,edit_answer_a,edit_answer_b,edit_answer_c,edit_answer_d,edit_correct_answer);
    res.status(200).send({"MESSAGE":"SUCCESSFULL !"})

})


//export 
// console.log(dataModels.load_data());
module.exports = router;