let urlBase = 'https://mock-api.driven.com.br/api/v4/buzzquizz';
let quizzes;
let buscarQuizzes;
let questoes;
let respostas;

setTimeout(buscarTodosQuizzes,1000);

function buscarSeusQuizzes() {
  const ulQuizzes = document.querySelector('.seusQuizzes');

}

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
    <li class="quizz" onclick="pegaQuiz()">
     <img src="${quiz.image}" alt="">
      <p>${quiz.title}</p>
      <div class="degradeQuizz"></div>
    </li>
    `
  ));
}


//Buscando um QUIZZ para o usuário responder
function buscarUmQuizz(){
  const promisse = axios.get(`${urlBase}/quizzes/ID_DO_QUIZZ`);
  promisse.then(quizzChegou);
}

function quizzChegou(resposta) {
  buscarQuizzes = resposta.data;
  renderizarPerguntas();
}

function renderizarPerguntas(){
  const ulPerguntas = document.querySelector('.respostaQuizz');

  buscarQuizzes.map((issoBanner) =>(
    ulPerguntas.innerHTML += `
      <li>
         <div class="banner">
             <img src="${issoBanner.image}">
             <div class="titulo-banner">
                 <p>
                    ${issoBanner.title}
                 </p>
             </div>
         </div>
      </li>
    `
    
  ));

  questoes.map((pergunta) => (
    ulPerguntas.innerHTML += `

    `
  ));
}

function pegaQuiz(){
  
}