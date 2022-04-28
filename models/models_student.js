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
let get_all_data = ()=>{
    return load_data();
}
//add questions 
let add_questions = (questions,answer_a,answer_b,answer_c,answer_d)=>{
    //load_data();
    let get_load_data = load_data();
    //store in object
    let new_data = {"id":uuidv4(),"questions":questions,"answer_a":answer_a,"answer_b":answer_b,"answer_c":answer_c,"answer_d":answer_d};
    get_load_data.push(new_data);
    //save data
    save_data(get_load_data);
}


//EXPORT
module.exports.load_data =load_data;
module.exports.add_questions =add_questions;
module.exports.get_all_data = get_all_data;

