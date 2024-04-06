const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const timerDisplay = document.createElement('div'); // Create a timer display element

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

// Your questions array
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
    timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;
    document.body.appendChild(timerDisplay);
    timerDisplay.style.position = 'absolute';
    timerDisplay.style.top = '20px';
    timerDisplay.style.right = '20px';
}

function startQuiz() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    displayNextQuestion();
    displayTimer();
    startTimer();
}

function displayNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionContainer.innerHTML = `
            <h2>${currentQuestion.question}</h2>
            ${currentQuestion.answers.map(answer =>
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
        timeLeft -= 5;
        if (timeLeft < 0) timeLeft = 0;
        resultContainer.textContent = "Incorrect!";
    }
    currentQuestionIndex++;
    displayNextQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        displayTimer();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    questionContainer.classList.add('hide');
    resultContainer.innerHTML = `
        <h3>Quiz Over!</h3>
        <p>Your score: ${score}</p>
        <input type="text" id="initials" placeholder="Your Initials" maxlength="3" />
        <button onclick="saveHighScore()">Submit</button>
    `;
}

function saveHighScore() {
    const initials = document.getElementById('initials').value.trim().toUpperCase();
    if (!initials) {
        alert('Please enter your initials!');
        return;
    }
    console.log(`High Score Saved: ${initials} - ${score}`); // Placeholder for storing/further processing
    // Example: localStorage.setItem('highScore', JSON.stringify({ initials, score }));

    resultContainer.innerHTML = `<p>Thank you, ${initials}. Your score of ${score} has been saved!</p>`;
}

startButton.addEventListener('click', startQuiz);
