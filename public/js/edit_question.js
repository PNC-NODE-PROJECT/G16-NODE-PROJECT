const dom_questions_view = document.getElementById("questions-view");
const dom_questions_dialog = document.getElementById("questions-dialog");
//display question and answer
function display_questions(datas){
    dom_questions_container= document.getElementById("questions-container");
    dom_questions_container.remove();
    dom_questions_container=document.createElement("div");
    dom_questions_container.id = "questions-container";
    dom_questions_view.appendChild(dom_questions_container);
    let question_id = 0;
    for(let index = 0; index < datas.length; index++) {
        question_id+=1;
        data = datas[index];
        let card =document.createElement("div");
        card.className = "card";
        
        let card_header = document.createElement("div");
        card_header.className = "card-header";

        card.appendChild(card_header);

        let question_info = document.createElement("div");
        question_info.className = "question-info";
        card_header.appendChild(question_info);

        let question=document.createElement("spam");
        question.className = "question";
        question.textContent = data.questions;
        question_info.appendChild(question);

        let answers_container = document.createElement("div");
        answers_container.className="answer-container";
        answers_container.id = question_id;

        let answer_1 = document.createElement("div");
        answer_1.className = "answer";
        answer_1.id="A";
        answer_1.style.background="red";
        let para_1 = document.createElement("p");
        answer_1.appendChild(para_1);
        para_1.textContent = data.answer_a;

        let answer_2 = document.createElement("div");
        answer_2.className = "answer";
        answer_2.id="A";
        answer_2.style.background="red";
        let para_2 = document.createElement("p");
        answer_2.appendChild(para_2);
        para_2.textContent = data.answer_b;

        let answer_3 = document.createElement("div");
        answer_3.className = "answer";
        answer_3.id="A";
        answer_3.style.background="red";
        let para_3 = document.createElement("p");
        answer_3.appendChild(para_3);
        para_3.textContent = data.answer_c;

        let answer_4 = document.createElement("div");
        answer_4.className = "answer";
        answer_4.id="A";
        answer_4.style.background="red";
        let para_4 = document.createElement("p");
        answer_4.appendChild(para_4);
        para_4.textContent = data.answer_d;
        let hr = document.createElement("hr");

        answers_container.appendChild(answer_1);
        answers_container.appendChild(answer_2);
        answers_container.appendChild(answer_3);
        answers_container.appendChild(answer_4);
        answers_container.appendChild(hr)

        
        dom_questions_container.appendChild(card);
        card.appendChild(answers_container);

    }
    console.log(dom_questions_view);
};
//HIDE SHOW
function hide(element) {
    element.style.display = 'none';
}
function show(element) {
    element.style.display = 'block';
}
function on_add_question(){
    show(dom_questions_dialog);
}
hide(dom_questions_dialog);
//get question from back-end
function get_all_question() {
    axios.get("/api/question").then((res) => {
        display_questions(res.data);
        console.log(res.data);
    });
}
//create question 
//@get value from font-end
function create_question() {
    hide(dom_questions_dialog);
    let new_question ={};
    new_question.question=document.getElementById('question').value;
    new_question.correct_answer=document.getElementById('correctAnswer').value;
    new_question.answer_1=document.getElementById('choiceA').value;
    new_question.answer_2=document.getElementById('choiceB').value;
    new_question.answer_3=document.getElementById('choiceC').value;
    new_question.answer_4=document.getElementById('choiceD').value;
    console.log(new_question)
    
}
create_question()

//
get_all_question();