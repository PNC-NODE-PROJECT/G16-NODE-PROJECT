const dom_start = document.getElementById("start");
const dom_quiz = document.getElementById("quiz");
const dom_question = document.getElementById("question");
const dom_answerA = document.getElementById("A");
const dom_answerB = document.getElementById("B");
const dom_answerC = document.getElementById("C");
const dom_answerD = document.getElementById("D");

//score 
const dom_score = document.getElementById("score");
const dom_score_p = document.getElementById("score_p");


//HIDE SHOW
function hide(element) {
    element.style.display = 'none';
}
function show(element) {
    element.style.display = 'block';
}


//get question from server
//display question
//play quiz
;
//display questions
let score = 0;
function render_question(quiz_question, index) {
    // console.log(number);
    let question = quiz_question[index];
    dom_question.textContent = question.questions;
    dom_answerA.textContent = question.answer_a;
    dom_answerB.textContent = question.answer_b;
    dom_answerC.textContent = question.answer_c;
    dom_answerD.textContent = question.answer_d;

}
//click to start play quiz
dom_start.addEventListener("click", (event) => {
    event.preventDefault();
    hide(dom_start);
    show(dom_quiz);
    //
    currect_question_index = 0;
    score = 0;
   
})

//check answer
//compute score
function check_answer(choice) {


    axios.get("/api/question").then((res) => {
        render_question(res.data, currect_question_index);
        let datas = res.data;
        let question_index = datas[currect_question_index];
        console.log(question_index)
        if (choice == question_index.correct_answer) {
            score += 1;

        }
        if (currect_question_index < datas.length - 1) {
            currect_question_index += 1
        } else {
            //display score
            show_score()
        }
    })
};
//good or bad
//append score percent to DOM
function show_score() {
    hide(dom_quiz);
    show(dom_score);
    axios.get("/api/question").then((res) => {
        let question_score = res.data;
        const percent_score = Math.round((100 * score) / question_score.length);
        let comment = "";
        if (percent_score <= 20) {
            comment = "HMMM !";
        } else if (percent_score <= 40) {
            comment = "YOU CAN IMPROVE";
        } else if (percent_score <= 60) {
            comment = "NOT BAD BUT...!";
        } else if (percent_score <= 80) {
            comment = "GOOD !";

        } else {
            comment = "WONDERFUL"
        }
        //display score to DOM
        dom_score_p.textContent = comment + " : " + percent_score + " %";
    })
};


