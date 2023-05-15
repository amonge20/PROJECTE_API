// script.js
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');

function displayQuestion(question) {
  questionElement.textContent = question.question;

  optionsElement.innerHTML = '';

  question.options.forEach(option => {
    const optionElement = document.createElement('div');
    optionElement.classList.add('option');
    optionElement.textContent = option;
    optionElement.addEventListener('click', () => {
      checkAnswer(option, question.answer);
    });

    optionsElement.appendChild(optionElement);
  });
}

function checkAnswer(selectedOption, correctAnswer) {
  optionsElement.innerHTML = '';

  const resultElement = document.createElement('p');
  resultElement.textContent = selectedOption === correctAnswer ? '¡Respuesta correcta!' : 'Respuesta incorrecta';
  resultElement.style.margin = '20px 0';

  optionsElement.appendChild(resultElement);

  setTimeout(getRandomQuestion, 2000);
}

function getRandomQuestion() {
  axios.get('https://opentdb.com/api.php?amount=1&type=multiple')
    .then(response => {
      const data = response.data.results[0];
      const question = {
        question: decodeEntities(data.question),
        options: shuffleOptions([
          decodeEntities(data.correct_answer),
          ...data.incorrect_answers.map(decodeEntities)
        ]),
        answer: decodeEntities(data.correct_answer)
      };

      displayQuestion(question);
    })
    .catch(error => {
      console.error(error);
      questionElement.textContent = 'Error al obtener la pregunta';
    });
}

function decodeEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

function shuffleOptions(options) {
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

getRandomQuestion();
