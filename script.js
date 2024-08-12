const questions = [
    { question: "What is 10 + 10?", answers: ["20", "5", "15", "50"], correct: 0 },
    { question: "What is 5 + 5?", answers: ["8", "7", "10", "6"], correct: 2 }
];

let currentQuestionIndex = 0;
let score = 0;

const startButton = document.getElementById("start-btn");
const homepage = document.getElementById("homepage");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-btn");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const backgroundMusic = document.getElementById("background-music");

backgroundMusic.volume = 0.3; 

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", moveToNextQuestion);
document.getElementById("restart-btn").addEventListener("click", restartQuiz);

function startQuiz() {
    homepage.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    showQuestion(questions[currentQuestionIndex]);
    playMusic(); 
}

function showQuestion(question) {
    questionElement.textContent = question.question;
    answerButtons.forEach((button, index) => {
        button.textContent = question.answers[index];
        button.disabled = false;
        button.classList.remove("correct", "incorrect");
        button.onclick = () => selectAnswer(index, question.correct);
    });
}

function selectAnswer(selected, correct) {
    answerButtons.forEach((button, index) => {
        button.disabled = true;
        button.classList.toggle("correct", index === correct);
        button.classList.toggle("incorrect", index === selected && selected !== correct);
    });
    if (selected === correct) score++;
    nextButton.classList.remove("hidden");
}

function moveToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add("hidden");
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    resultText.textContent = `You scored ${score} out of ${questions.length}.`;
    stopMusic();
}

function restartQuiz() {
    resultContainer.classList.add("hidden");
    homepage.classList.remove("hidden");
    stopMusic();
    currentQuestionIndex = 0;
    score = 0;
}

function playMusic() {
    backgroundMusic.play().catch(error => {
        console.error('Error playing background music:', error);
    });
}

function stopMusic() {
    backgroundMusic.pause(); 
    backgroundMusic.currentTime = 0; 
}
