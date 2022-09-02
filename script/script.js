let urlBase = 'https://mock-api.driven.com.br/api/v4/buzzquizz';
let quizzes;

let infosIniciais;
let tituloDoQuizz;
let quantidadeDePerguntas;
let quantidadeDeNiveis;

let buscarQuizz;
let questoes;
let respostas;

let tituloNovo;
let qntPer;
let qntNiv;
let imagemNova;

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

//Buscando um QUIZZ para o usuário responder
function pegaQuiz(idQuiz){
  buscarUmQuizz(idQuiz);
}

buscarUmQuizz();

function buscarUmQuizz(id){
  const promisse = axios.get(`${urlBase}/quizzes/${id}`);
  promisse.then(quizzChegou);
}

function quizzChegou(resposta) {
  buscarQuizz = resposta.data;
  renderizarPerguntas(buscarQuizz);
}

// chama a tela de criação
function criarQuizz(){
  
  let criaQuizz = document.querySelector('.paginaInicial');
  criaQuizz.classList.add('escondida');

  let escondeResposta = document.querySelector('.respostasQuizzes');
  escondeResposta.classList.add('escondida');

  let telaInicial = document.querySelector('.informacoesIniciais');
  telaInicial.classList.remove('escondida');
}

// condições para que o quizz seja aceito
function irParaPerguntas(){
  
  tituloDoQuizz = document.querySelector('.titulo').value;
  imagem = document.querySelector('.imagem').value
  quantidadeDePerguntas = document.querySelector('.qntdDePerguntas').value;
  quantidadeDeNiveis = document.querySelector('.qntdDeNiveis').value;
  if(tituloDoQuizz.length < 20 || tituloDoQuizz.length > 65){
    alert("O título deve ter entre 20 a 65 letras");
  }
  else{
    tituloNovo = tituloDoQuizz;
    if(quantidadeDePerguntas < 3){
      alert('Digite um numero/No minímo 3');
    }
    else{
      qntPer = quantidadeDePerguntas;
      if(quantidadeDeNiveis < 3){
        alert('Digite um numero/No minímo 3');
      }
      else{
        qntNiv = quantidadeDeNiveis;
        if(validURL(imagem) === false) {
          alert('URL inválida');
        }
        else{
         imagemNova = imagem;
         prosseguir();
        }
      } 
    }
  }

}

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

// Habilita o usuario a prosseguir com a criação de perguntas 
function prosseguir(){
  if(tituloNovo !== ''){
    console.log(tituloNovo);
    if(qntPer !== ''){
        console.log(qntPer);
        if(qntNiv !== ''){
            console.log(qntNiv);
          let criaPerguntas = document.querySelector('.informacoesIniciais');
          criaPerguntas.classList.add('escondida');
          
          const perguntas = document.querySelector('.perguntas');
          perguntas.classList.remove('escondida');
        }
      }
    }
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
              <div class="caixa-pergunta">
                    ${pergunta.title}
              </div>
          </li>
        `;

        // aqui é o answers
    pergunta.answers.forEach((resposta)=> {
      ulPerguntas.innerHTML += `
      <li class="lado">
          <div class="caixa-resposta">
             <div class="resposta">
                <img src="${resposta.image}" />
                ${resposta.text}
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

function pegaQuiz(){
  
}