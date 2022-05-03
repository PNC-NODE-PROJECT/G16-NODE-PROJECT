const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const PATH = './data/data_student.json';

let load_data = () => {
    return JSON.parse(fs.readFileSync(PATH));

};
let save_data = (data) => {
    fs.writeFileSync(PATH, JSON.stringify(data, null, 4));
}
// get all data
let get_all_question = () => {
    return load_data();
}

//add questions 
let add_questions = (questions, answer_a, answer_b, answer_c, answer_d, correct_answer) => {
    //load_data();
    let get_load_question = load_data();
    //store in object
    // ---
    let is_the_same_question = false;
    get_load_question.forEach(element => {
        if (element.questions === questions) {
            is_the_same_question = true;
        };
    });
    //number of questions
    let number_question = null;
    if (number_question > 0) {
        number_question = get_load_question[get_load_question.length - 1].number_question + 1;
    } else {
        number_question += 1
    }
    if (!is_the_same_question) {
        let new_data = { "number_question": number_question, "id": uuidv4(), "questions": questions, "answer_a": answer_a, "answer_b": answer_b, "answer_c": answer_c, "answer_d": answer_d, "correct_answer": correct_answer };
        get_load_question.push(new_data);

        //save data
        save_data(get_load_question);
    }


    // Return null of the error message
    let error = null; // null = valid
    if (is_the_same_question) {
        error = "This question already exists in the quiz"
    }

    return error;

}

//
// Remove question 
// @param {id} the id of the question
// @return {boolean} true if question was removed
let remove_question = (id) => {
    let questions = load_data();
    
    let index = questions.findIndex(question => question.id === id);
    if (index !== -1) {
        questions.splice(index, 1);
        save_data(questions);
    }

    return index !== -1;   // return true if question was removed
}
//edit one questions 
let edit_question = (edit_id, edit_question, edit_answer_a, edit_answer_b, edit_answer_c, edit_answer_d, edit_correct_answer) => {
    let load_data_edit = load_data();
    let index = load_data_edit.findIndex(edit_questions => edit_questions.id === edit_id);
    if (index > -1) {
        let questions = load_data_edit[index];
        if (edit_question !== undefined) {
            questions.questions = edit_question;
        }
        if (edit_answer_a !== undefined) {
            questions.answer_a = edit_answer_a;
        }
        if (edit_answer_b !== undefined) {
            questions.answer_b = edit_answer_b;
        }
        if (edit_answer_c !== undefined) {
            questions.answer_c = edit_answer_c;
        }
        if (edit_answer_d !== undefined) {
            questions.answer_d = edit_answer_d;
        }
        if (edit_correct_answer !== undefined) {
            questions.correct_answer = edit_correct_answer;
        }

    }
    save_data(load_data_edit);
}

//EXPORT
module.exports = {
    get_all_question,
    add_questions,
    remove_question,
    edit_question
}
