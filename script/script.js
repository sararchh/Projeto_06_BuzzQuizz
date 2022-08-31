let urlBase = 'https://mock-api.driven.com.br/api/v4/buzzquizz';
let quizzes;

buscarTodosQuizzes();

function buscarTodosQuizzes() {
  const promisse = axios.get(`${urlBase}/quizzes`);
  promisse.then(listaDeQuizzes);
}

function listaDeQuizzes(response) {
  quizzes = response.data;

  renderizarTodosQuizzes();
}

function renderizarTodosQuizzes() {
  const ulQuizzes = document.querySelector('.quizzes');

  quizzes.map((quiz) => (
    ulQuizzes.innerHTML += `
    <li>
     <img src="${quiz.image}" alt="">
      <p>${quiz.title}</p>
    </li>
    `
  ));
}