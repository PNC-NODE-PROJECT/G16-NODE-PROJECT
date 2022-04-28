const fs = require('fs');
const {v4: uuidv4}=require('uuid');

const PATH= './data/data_question.json';

let load_data = ()=>{
    return JSON.parse(fs.readFileSync(PATH));

};
// write data
let save_data = (data)=>{
    fs.writeFileSync(PATH, JSON.stringify(data,null,4));
}
// get all data
let get_all_question= ()=>{
    return load_data();
}

//add questions 
let add_questions = (questions,answer_a,answer_b,answer_c,answer_d,correct_answer)=>{
    //load_data();
    let get_load_question = load_data();
    //store in object
    let new_data = {"id":uuidv4(),"questions":questions,"answer_a":answer_a,"answer_b":answer_b,"answer_c":answer_c,"answer_d":answer_d,"correct_answer":correct_answer};
    get_load_question.push(new_data);
    //save data
    save_data(get_load_question);
}



//EXPORT
module.exports.get_all_question = get_all_question
module.exports.load_data =load_data;
module.exports.add_questions =add_questions;

