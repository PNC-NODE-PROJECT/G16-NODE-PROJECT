const fs = require('fs');
const {v4: uuidv4}=require('uuid');

const PATH= './data/data_student.json';

let load_data = ()=>{
    return JSON.parse(fs.readFileSync(PATH));

};
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

// remove question
let remove_question = (id) => {
    let questions = load_data();
    let index = questions.findIndex(question => question.id === id);
    console.log(index !== -1)
    if (index !== -1) {
        questions.splice(index, 1);
    }
    save_data(questions)
    // return status
}

//EXPORT
module.exports = {
    get_all_question,
    load_data,
    add_questions,
    remove_question
}
