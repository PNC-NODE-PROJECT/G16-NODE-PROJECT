const dom_questions_view = document.getElementById("questions-view");
const dom_questions_dialog = document.getElementById("questions-dialog");
const dom_add_question_button = document.getElementById("add_question_button");
//button create_question
const dom_create_question_button = document.getElementById("create_question_button");

let questionId=0
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

        let delete_edit_div= document.createElement("div");
        delete_edit_div.className = "delete_edit";

        
        let i_delete = document.createElement("i");
        i_delete.className = "fa-solid fa-trash-can";
        //delete question
        let a_delete = document.createElement("a");
        a_delete.href = "#";
        a_delete.className = "delete";
        a_delete.appendChild(i_delete)

        //edit question
 

        let a_edit = document.createElement("a");
        a_edit.href = "#";
        a_edit.className = "edit";
        a_edit.textContent = "EDIT";
        a_edit.id = data.id;
        a_edit.addEventListener("click",()=>{
            edit_question(a_edit.id);
        });
        delete_edit_div.appendChild(a_delete);
        delete_edit_div.appendChild(a_edit);


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
        card.appendChild(delete_edit_div)


        
        //correct answer
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
    get_all_question()
}
hide(dom_questions_dialog);
//get question from back-end
function get_all_question() {
    axios.get("/api/question").then((res) => {
        display_questions(res.data);
        console.log(res.data);
    });
}
//edit question 
//@edit_question
// let question_to_edit =null;
function edit_question(id) {
    questionId=id
    axios.get("/api/question").then((res) => {
        // question_to_edit =event.target.parentElement.id
        let question_edit = res.data;
        question_edit.forEach((element )=> {
            if(element.id === id){
                document.getElementById('question').value=element.questions
                document.getElementById('correctAnswer').value=element.correct_answer
                document.getElementById('choiceA').value=element.answer_a
                document.getElementById('choiceB').value=element.answer_b
                document.getElementById('choiceC').value=element.answer_c
                document.getElementById('choiceD').value=element.answer_d
                // document.querySelector('#choiceA')=answer_a;
                dom_create_question_button.textContent= "EDIT";
               
                show(dom_questions_dialog);
            }
        });
        
    });
}
//cancel create form if we don't want to create 
function cancel_create() {
    hide(dom_questions_dialog);
    show(add_question_button);
    dom_create_question_button.textContent="CREATE";
    
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
    
    document.body.addEventListener("click", (e)=>{
        if(e.target.textContent=="EDIT"){
            axios.patch("/api/question/"+questionId, new_question).then((res) => {
                console.log("YES");
            });
        
        }else{
            axios.post("/api/question", new_question).then((res) => {
                console.log("YES");
            });
        }
            
            
    });
    get_all_question()
}


//delete tasks
function click_tasks() {
    document.body.addEventListener("click", (e)=>{
        let id = e.target.parentElement.parentElement.parentElement.id;
        if (e.target.className=="fa-solid fa-trash-can") {
            let isExecuted = confirm("Are you sure to delete this question?");
            if (isExecuted) {
                axios.delete("/api/question/" + id).then((res) => {
                    console.log(res);
                })
            }
        }
        
    });
    
}
dom_questions_container.addEventListener("click", click_tasks);
get_all_question();