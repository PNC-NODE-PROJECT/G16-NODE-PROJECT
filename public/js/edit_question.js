const dom_questions_view = document.getElementById("questions-view");
const dom_questions_dialog = document.getElementById("questions-dialog");
const dom_add_question_button = document.getElementById("add_question_button");

//display question and answer
const dom_questions_container = document.getElementById("questions-container");
function display_questions(datas) {
    while (dom_questions_container.firstChild) {
        dom_questions_container.removeChild(dom_questions_container.lastChild);
    }
    let dom_container_div_question = document.createElement("div");
    dom_container_div_question.id = "questions-container";
    dom_questions_view.appendChild(dom_container_div_question);
    let question_id = 0;
    for (let index = 0; index < datas.length; index++) {
        question_id += 1;
        data = datas[index];
        let card = document.createElement("div");
        card.className = "card";
        card.id = data.id;

        let card_header = document.createElement("div");
        card_header.className = "card-header";

        card.appendChild(card_header);

        let question_info = document.createElement("div");
        question_info.className = "question-info";
        card_header.appendChild(question_info);



        let question = document.createElement("spam");
        question.className = "question";
        question.textContent = data.questions;
        question_info.appendChild(question);



        //delete question
        let a_delete = document.createElement("a");
        a_delete.href = "#";
        a_delete.className = "delete";
        a_delete.textContent = "DELETE";
        //edit question
        let a_edit = document.createElement("a");
        a_edit.href = "#";
        a_edit.className = "edit";
        a_edit.textContent = "EDIT";



        let answers_container = document.createElement("div");
        answers_container.className = "answer-container";
        answers_container.id = question_id;

        let answer_1 = document.createElement("div");
        answer_1.className = "answer";
        answer_1.id = "A";
        answer_1.style.background = "red";
        let para_1 = document.createElement("p");
        answer_1.appendChild(para_1);
        para_1.textContent = data.answer_a;

        let answer_2 = document.createElement("div");
        answer_2.className = "answer";
        answer_2.id = "B";
        answer_2.style.background = "red";
        let para_2 = document.createElement("p");
        answer_2.appendChild(para_2);
        para_2.textContent = data.answer_b;

        let answer_3 = document.createElement("div");
        answer_3.className = "answer";
        answer_3.id = "C";
        answer_3.style.background = "red";
        let para_3 = document.createElement("p");
        answer_3.appendChild(para_3);
        para_3.textContent = data.answer_c;

        let answer_4 = document.createElement("div");
        answer_4.className = "answer";
        answer_4.id = "D";
        answer_4.style.background = "red";
        let para_4 = document.createElement("p");
        answer_4.appendChild(para_4);
        para_4.textContent = data.answer_d;
        // let hr = document.createElement("hr");

        answers_container.appendChild(answer_1);
        answers_container.appendChild(answer_2);
        answers_container.appendChild(answer_3);
        answers_container.appendChild(answer_4);



        dom_questions_container.appendChild(card);
        card.appendChild(answers_container);


        card.appendChild(a_delete);
        card.appendChild(a_edit);

        let answers = document.getElementById(question_id)
        for (let element of answers.childNodes) {
            if (element.id == data.correct_answer) {
                element.style.background = "green";
            }
        }

    }
    console.log(dom_questions_container)
};
//HIDE SHOW
function hide(element) {
    element.style.display = 'none';
}
function show(element) {
    element.style.display = 'block';
}
function on_add_question() {
    show(dom_questions_dialog);
    hide(add_question_button);
}
hide(dom_questions_dialog);
//get question from back-end
function get_all_question() {
    axios.get("/api/question").then((res) => {
        display_questions(res.data);
        console.log(res.data);
    });
}
//cancel create form if we don't want to create 
function cancel_create() {
    hide(dom_questions_dialog);
    show(add_question_button);
}
//create question 
//@get value from font-end
function create_question() {
    hide(dom_questions_dialog);
    show(add_question_button);
    let new_question = {};
    new_question.question = document.getElementById('question').value;
    new_question.correct_answer = document.getElementById('correctAnswer').value;
    new_question.answer_1 = document.getElementById('choiceA').value;
    new_question.answer_2 = document.getElementById('choiceB').value;
    new_question.answer_3 = document.getElementById('choiceC').value;
    new_question.answer_4 = document.getElementById('choiceD').value;
    // if(new_question.length !==0){
    axios.post("/api/add_question", new_question).then((res) => {
        console.log(res);
    });

    // }


}
// create_question()
//
get_all_question();

function click_tasks(e) {
    e.preventDefault();
    let id = e.target.parentElement.id;
    if (e.target.className === "delete") {
        let isExecuted = confirm("Are you sure to delete this question?");
        if (isExecuted) {
            axios.delete("/api/delete_question/" + id).then((res) => {
                console.log(res);
            })
        }
    }
    console.log(id);
}
dom_questions_container.addEventListener("click", click_tasks);