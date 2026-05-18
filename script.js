const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the worst-case time complexity of Quick Sort?",
    answers: [
      { text: "O(n log n)", correct: false },
      { text: "O(log n)", correct: false },
      { text: "O(n²)", correct: true },
      { text: "O(n)", correct: false },
    ],
  },
  {
    question:
      "Which data structure is typically used to implement Dijkstra’s Algorithm efficiently?",
    answers: [
      { text: "Stack", correct: false },
      { text: "Queue", correct: false },
      { text: "Priority Queue", correct: true },
      { text: "Linked List", correct: false },
    ],
  },
  {
    question: "What is the space complexity of Merge Sort?",
    answers: [
      { text: "O(1)", correct: false },
      { text: "O(log n)", correct: false },
      { text: "O(n)", correct: true },
      { text: "O(n²)", correct: false },
    ],
  },
  {
    question:
      "Which tree traversal gives nodes in sorted order for a Binary Search Tree?",
    answers: [
      { text: "Preorder", correct: false },
      { text: "Postorder", correct: false },
      { text: "Level Order", correct: false },
      { text: "Inorder", correct: true },
    ],
  },
  {
    question:
      "Which algorithm is used to detect cycles in a graph using Disjoint Sets?",
    answers: [
      { text: "Kruskal’s Algorithm", correct: true },
      { text: "Binary Search", correct: false },
      { text: "Floyd Warshall", correct: false },
      { text: "Bellman Ford", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  resultScreen.classList.remove("active");
  loadQuestion();
}

function loadQuestion() {
  answerDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer, index) => {
    const answerButton = document.createElement("button");
    answerButton.textContent = answer.text;
    answerButton.classList.add("answer-btn");
    answerButton.dataset.correct = answer.correct;
    answerButton.addEventListener("click", selectAnswer);
    answersContainer.appendChild(answerButton);
  });
}

function selectAnswer(event) {
  if (answerDisabled) return;

  answerDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScoreSpan.textContent = score;
  if (score === quizQuestions.length) {
    resultMessage.textContent = "Excellent! You got a perfect score!";
  } else if (score >= quizQuestions.length / 2) {
    resultMessage.textContent = "Good job! You scored above average.";
  } else {
    resultMessage.textContent = "Keep practicing! You can do better.";
  }
}
function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
