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
const dom_progress = document.getElementById("progressbar");
const dom_count = document.getElementById("count");
const dom_alert_time = document.getElementById("alert_time");
const dom_button_next = document.getElementById("button_next");
const dom_emoji = document.getElementById("emoji");
const dom_hide = document.getElementById("hide");
const dom_title_header = document.getElementById("title_header");



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
//display questions


let score = 0;
let currentQuestion = 0;
// console.log(score);
function render_question(quiz_question) {

    let question = quiz_question[currentQuestion];
    dom_question.textContent =question.questions;
    dom_answerA.textContent = question.answer_a;
    dom_answerB.textContent = question.answer_b;
    dom_answerC.textContent = question.answer_c;
    dom_answerD.textContent = question.answer_d;
    
}

axios.get("/api/question").then((res) => {
    let listQuestion = res.data;
    if (currentQuestion < listQuestion.length) {
        render_question(listQuestion);
        currentQuestion += 1;
    }
});
//check answer
//compute score
function check_answer(choice) {
    axios.get("/api/question").then((res) => {
        let listQuestion = res.data;
        listQuestion.forEach((question) => {
            if (choice == question.correct_answer) {
                score +=   1
            }
        })
        if (currentQuestion < listQuestion.length) {
            render_question(listQuestion);
            currentQuestion += 1;
        } else {
            show_score()
            clearInterval(i)
        }

    });
    countdown = 0;
    width=0;
};

//
// Click start play quiz 
//show dom_quiz and hide img 
//click start all score will count back from 1
//
let countdown = 0;
let width = 0;
dom_start.addEventListener("click", (event) => {
    event.preventDefault();
    i = setInterval(() => {
            countdown = countdown + 1;
            width=width+6.6;
            dom_count.textContent = countdown;
            dom_progress.style.width = width + "%";
            dom_alert_time.textContent="Times :"+0;
            
            dom_alert_time.style.color = "Black";
            if(countdown>=10 && countdown <=15){
                dom_alert_time.style.color="red";
                dom_alert_time.textContent="Left 5 second: ";
            }
        
            if (countdown === 15) {
                countdown = 0;
                width=0;
                check_answer();
                dom_progress.style.width = "%";
            }
            console.log(countdown);
        },1000);
    hide(dom_hide);
    hide(dom_start);
    show(dom_quiz);
    hide(dom_title_header);
    score = 0;
    width=0;
    countdown = 0;
})

//
//good or bad
//append score percent to DOM
//

function show_score() {
    show(dom_title_header);
    hide(dom_quiz);
    show(dom_score);
    axios.get("/api/question").then((res) => {
        let question_score = res.data;
        const percent_score = Math.round((100 * score) / question_score.length);
        let comment = "";
        let image = document.createElement("img");
        if (percent_score <= 20) {
            image.src="../img/worst.png"
            comment = "HMMM !";
        } else if (percent_score <= 40) {
            image.src="../img/improve.png"
            comment = "YOU CAN IMPROVE";
        } else if (percent_score <= 60) {
            image.src= "../img/ok.png"
            comment = "NOT BAD BUT...!";
        } else if (percent_score <= 80) {
            image.src="../img/good.png";
            comment = "GOOD !";

        } else {
            image.src = "../img/best.png";
            comment = "WONDERFUL";
        }
        //display score to DOM
        dom_emoji.appendChild(image);
        dom_score_p.textContent = comment + " : " + percent_score + " %";
    })
};