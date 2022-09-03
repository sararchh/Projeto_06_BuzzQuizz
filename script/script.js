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
  const promisse = axios.get(`${urlBase}/quizzes/${Number(id)}`);
  promisse.then(quizzChegou);
}

function quizzChegou(resposta) {
  buscarQuizz = resposta.data;
  renderizarPerguntas(buscarQuizz);
}


function baralhador() {
  return Math.random() - 0.5;
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


   for(let i = 0; quizz.questions.length; i++){

     ulPerguntas.innerHTML += `
     <li class="li-principal"> 
        <div class="caixa-pergunta">
           ${quizz.questions[i].title}
        </div>
     </li>
     `;
    }
    
  const respostasDoUsuario = document.querySelector('.li-principal')

   for(let j = 0; j < quizz.answers.length; j++){

     respostasDoUsuario.innerHTML += `
     <div class="resposta">
         <img src="${quizz.answers[j].image}" />
         ${quizz.answers[j].text}
     </div>
     `
     console.log(respostasDoUsuario);
  }
    //   //Aqui formata a pergunta, é o questions
    //   quizz.questions.forEach((pergunta) => {
  //     ulPerguntas.innerHTML += `
  //         <li class="li-principal">
  //             <div class="caixa-pergunta">
  //                   ${pergunta.title}
  //             </div>
  //         </li>
  //       `;

  //       //Embaralhando as perguntas
  //       // aqui é o answers
  //       const adicionaRespostas = document.querySelector('.li-principal');

  //   pergunta.answers.sort(baralhador).forEach((resposta)=> {
  //     adicionaRespostas.innerHTML += `
        
  //            <div class="resposta" onclick="pikachuEuEscolhoVoce(this)">
  //               <img src="${resposta.image}" />
  //               ${resposta.text}
  //            </div>
  //   `;
  //   }) //fechamento foreach das respostas

  //   }) // fechamento foreach das perguntas

  //   // aqui é o levels
  //   quizz.levels.forEach((level)=>{
  //     //aqui voce busca o level e faz o inner

  //   }) //fechamento do foreach level

}

function pikachuEuEscolhoVoce(seletor){
    seletor.add('opacidade');
    console.log(seletor);

}

