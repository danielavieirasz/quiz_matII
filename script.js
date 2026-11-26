const questions = [
  {
    category: "Álgebra",
    text: "Qual é o valor de x na equação 3x + 7 = 25?",
    answers: ["x = 5", "x = 6", "x = 8", "x = 9"],
    correct: 1,
  },
  {
    category: "Potências",
    text: "Quanto é 2³ × 2²?",
    answers: ["2⁵", "2⁶", "4⁵", "6²"],
    correct: 0,
  },
  {
    category: "Porcentagem",
    text: "Quanto é 25% de 240?",
    answers: ["50", "60", "80", "96"],
    correct: 1,
  },
  {
    category: "Geometria",
    text: "Um triângulo retângulo tem catetos medindo 6 cm e 8 cm. Quanto mede a hipotenusa?",
    answers: ["10 cm", "12 cm", "14 cm", "16 cm"],
    correct: 0,
  },
  {
    category: "Funções",
    text: "Na função f(x) = 2x − 3, qual é o valor de f(5)?",
    answers: ["4", "7", "10", "13"],
    correct: 1,
  },
  {
    category: "Frações",
    text: "Qual fração é equivalente a 3/4?",
    answers: ["6/12", "9/12", "9/16", "12/16"],
    correct: 1,
  },
  {
    category: "Proporção",
    text: "Se 5 cadernos custam R$ 40, quanto custam 8 cadernos?",
    answers: ["R$ 64", "R$ 60", "R$ 72", "R$ 56"],
    correct: 0,
  },
  {
    category: "Estatística",
    text: "Qual é a média dos números 6, 8, 10 e 12?",
    answers: ["8", "9", "10", "11"],
    correct: 1,
  },
  {
    category: "Áreas",
    text: "Qual é a área de um retângulo com 7 m de comprimento e 4 m de largura?",
    answers: ["22 m²", "28 m²", "44 m²", "56 m²"],
    correct: 1,
  },
  {
    category: "Equações",
    text: "Quais são as soluções da equação x² − 5x + 6 = 0?",
    answers: ["x = 1 e x = 6", "x = 2 e x = 3", "x = −2 e x = −3", "x = 0 e x = 5"],
    correct: 1,
  },
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let answered = false;

const quizView = document.querySelector("#quiz-view");
const resultView = document.querySelector("#result-view");
const questionCount = document.querySelector("#question-count");
const scoreCount = document.querySelector("#score-count");
const progressBar = document.querySelector("#progress-bar");
const questionNumber = document.querySelector("#question-number");
const questionCategory = document.querySelector("#question-category");
const questionText = document.querySelector("#question-text");
const answersContainer = document.querySelector("#answers");
const nextButton = document.querySelector("#next-button");

function renderQuestion() {
  const question = questions[currentQuestion];
  selectedAnswer = null;
  answered = false;

  questionCount.textContent = `Questão ${currentQuestion + 1} de ${questions.length}`;
  scoreCount.textContent = `${score} ${score === 1 ? "acerto" : "acertos"}`;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  questionNumber.textContent = currentQuestion + 1;
  questionCategory.textContent = question.category;
  questionText.textContent = question.text;
  answersContainer.innerHTML = "";
  nextButton.disabled = true;
  nextButton.textContent = "Confirmar resposta";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    button.textContent = answer;
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", "false");
    button.addEventListener("click", () => selectAnswer(index, button));
    answersContainer.appendChild(button);
  });
}

function selectAnswer(index, button) {
  if (answered) return;

  selectedAnswer = index;
  document.querySelectorAll(".answer").forEach((answerButton) => {
    answerButton.classList.remove("selected");
    answerButton.setAttribute("aria-checked", "false");
  });
  button.classList.add("selected");
  button.setAttribute("aria-checked", "true");
  nextButton.disabled = false;
}

function submitAnswer() {
  if (selectedAnswer === null) return;

  if (answered) {
    currentQuestion += 1;
    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      showResults();
    }
    return;
  }

  answered = true;
  const question = questions[currentQuestion];
  const answerButtons = document.querySelectorAll(".answer");

  answerButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.correct) {
      button.classList.add("correct");
    } else if (index === selectedAnswer) {
      button.classList.add("incorrect");
    }
  });

  if (selectedAnswer === question.correct) {
    score += 1;
  }

  scoreCount.textContent = `${score} ${score === 1 ? "acerto" : "acertos"}`;
  nextButton.textContent =
    currentQuestion === questions.length - 1 ? "Ver resultado" : "Próxima questão";
}

function showResults() {
  quizView.hidden = true;
  resultView.hidden = false;

  const percentage = score / questions.length;
  const title = document.querySelector("#result-title");
  const message = document.querySelector("#result-message");
  const icon = document.querySelector("#result-icon");

  document.querySelector("#final-score").textContent = `${score}/${questions.length}`;

  if (percentage === 1) {
    title.textContent = "Resultado perfeito!";
    message.textContent = "Excelente! Você acertou todas as questões.";
    icon.textContent = "★";
  } else if (percentage >= 0.7) {
    title.textContent = "Muito bem!";
    message.textContent = "Você teve um ótimo desempenho nesta recuperação.";
    icon.textContent = "★";
  } else if (percentage >= 0.5) {
    title.textContent = "Bom trabalho!";
    message.textContent = "Você está no caminho certo. Revise os pontos que errou e tente novamente.";
    icon.textContent = "✓";
  } else {
    title.textContent = "Continue estudando!";
    message.textContent = "Cada tentativa ajuda a aprender. Revise os conteúdos e refaça o quiz.";
    icon.textContent = "↻";
  }
}

nextButton.addEventListener("click", submitAnswer);
document.querySelector("#restart-button").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  quizView.hidden = false;
  resultView.hidden = true;
  renderQuestion();
});

renderQuestion();
