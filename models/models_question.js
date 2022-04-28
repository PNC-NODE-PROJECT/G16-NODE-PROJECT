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
let get_all_data = ()=>{
    return load_data();
}



//EXPORT
module.exports.get_all_data = get_all_data;
// module.exports.remove_question = remove_question;

