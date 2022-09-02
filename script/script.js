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
    <li class="quizz" onclick="pegaQuiz(${quiz.id})">
     <img src="${quiz.image}" alt="imagem quizz">
      <p>${quiz.title}</p>
      <div class="degradeQuizz"></div>
    </li>
    `
  ));
}

function pegaQuiz(idQuiz){
  buscarUmQuizz(idQuiz);
}

buscarUmQuizz();

//Buscando um QUIZZ para o usuário responder
function buscarUmQuizz(id){
  const promisse = axios.get(`${urlBase}/quizzes/${id}`);
  promisse.then(quizzChegou);
}

function quizzChegou(resposta) {
  buscarQuizz = resposta.data;
  renderizarPerguntas(buscarQuizz);
}

function renderizarPerguntas(quizz){
  const divListarSeusQuizzes = document.querySelector('.listarSeusQuizzes');
  const divCriarQuizz = document.querySelector('.criarQuizz');
  const divTodosOsQuizzes = document.querySelector('.todosOsQuizzes');
  const divRespostasQuizzes = document.querySelector('.respostasQuizzes');

  divListarSeusQuizzes.classList.add('escondida');
  divCriarQuizz.classList.add('escondida');
  divTodosOsQuizzes.classList.add('escondida');
  divRespostasQuizzes.classList.remove('escondida');

  const ulPerguntas = document.querySelector('.respostaQuizz');

  ulPerguntas.innerHTML += `
  <li>
     <div class="banner">
         <img src="${quizz.image}">
         <div class="titulo-banner">
             <p>
                ${quizz.title}
             </p>
         </div>
     </div>
  </li>`;
    
    //Aqui formata a pergunta, é o questions
    quizz.questions.forEach((pergunta) => {
      ulPerguntas.innerHTML += `
          <li>
              <div>
                 <div>
                    ${pergunta.title}
                 </div>
              </div>
          </li>
        `;

        // aqui é o answers
    pergunta.answers.forEach((resposta)=> {
      ulPerguntas.innerHTML += `
      <li>
          <div>
             <div>
                ${resposta.title}
             </div>
          </div>
      </li>
    `;
    }) //fechamento foreach das respostas

    }) // fechamento foreach das perguntas

    // aqui é o levels
    quizz.levels.forEach((level)=>{
      //aqui voce busca o level e faz o inner

    }) //fechamento do foreach level

}

