const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;

const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin"],
        correctAnswer: "Paris"
    },
    {
        question: "Who is the President of the United States?",
        answers: ["Spongebob", "Joe Biden", "Joe Dirt"],
        correctAnswer: "Joe Biden"
    },
    {
        question: "What is 3+3?",
        answers: ["9", "60", "6"],
        correctAnswer: "6"
    },
    {
        question: "What is the distance of a mile?",
        answers: ["4806 feet", "9643 feet", "5280 feet"],
        correctAnswer: "5280 feet"
    },

];


function startQuiz() {
    startButton.classList.add('hide');
    displayNextQuestion();

    startTimer();
}

function displayNextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        <div id="answers">
            ${currentQuestion.answers.map(answer => `<div class="answer">${answer}</div>`).join('')}
        </div>
    `;
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
        resultContainer.textContent = "Correct!";
    } else {
        timeLeft -= 10;
        resultContainer.textContent = "Incorrect!";
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayNextQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {

    resultContainer.innerHTML = `
        <h3>Quiz Over!</h3>
        <p>Your score: ${score}</p>
        <input type="text" id="initials" placeholder="Enter your initials">
        <button onclick="saveScore()">Save Score</button>
    `;
}

function saveScore() {
    const initials = document.getElementById('initials').value;

}


startButton.addEventListener('click', startQuiz);
questionContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('answer')) {
        checkAnswer(e.target.textContent);
    }
});
