const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const timerDisplay = document.createElement('div'); // Create a timer display element

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

// Your questions array will go here
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

function displayTimer() {
    timerDisplay.textContent = `Time Left: ${timeLeft} seconds`; // Set the timer text
    document.body.appendChild(timerDisplay); // Append the timer to the body
    timerDisplay.style.position = 'absolute';
    timerDisplay.style.top = '20px';
    timerDisplay.style.right = '20px';
}

function startQuiz() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    displayNextQuestion();
    displayTimer(); // Display the timer
    startTimer();
}

function displayNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.innerHTML = `
            <h2>${currentQuestion.question}</h2>
            ${currentQuestion.answers.map((answer, index) =>
            `<button onclick="checkAnswer('${answer}')" class="answer">${answer}</button>`
        ).join('')}
        `;
    } else {
        endQuiz();
    }
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
        resultContainer.textContent = "Correct!";
    } else {
        timeLeft -= 5; // Deduct 5 seconds for incorrect answer
        if (timeLeft < 0) timeLeft = 0; // Ensure time doesn't go negative
        resultContainer.textContent = "Incorrect!";
    }
    currentQuestionIndex++;
    displayNextQuestion(); // Display the next question or end quiz if it was the last one
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        displayTimer(); // Update timer display
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval); // Stop the timer
    questionContainer.classList.add('hide');
    resultContainer.innerHTML += `<h3>Quiz Over!</h3><p>Your score: ${score}</p>`;
}

startButton.addEventListener('click', startQuiz);
