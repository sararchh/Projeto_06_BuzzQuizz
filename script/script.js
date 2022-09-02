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

let tituloDaPergunta1;
let corDeFundo1;
let respostaCerta;
let imagemDaRespostaCerta;
let respostaIncorreta1;
let respostaIncorreta2;
let respostaIncorreta3;
let imagemIncorreta1;
let imagemIncorreta2;
let imagemIncorreta3; 

let tituloDoNivel;
let porcentagem;
let imagemDoNivel;
let descricaoDoNivel;
let porcentagemMinima;

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

// condições para que a pergunta seja aceita 
function irParaNiveis(){
  tituloDaPergunta1 = document.querySelector('.tituloPergunta1').value;
  corDeFundo1 = document.querySelector('.corDeFundo1').value;
  respostaCerta = document.querySelector('.respostaCerta').value;
  imagemDaRespostaCerta = document.querySelector('.imagemDaRespostaCerta').value
  respostaIncorreta1 = document.querySelector('.respostaIncorreta1').value; 
  respostaIncorreta2 = document.querySelector('.respostaIncorreta2').value;
  respostaIncorreta3 = document.querySelector('.respostaIncorreta3').value;
  imagemIncorreta1 = document.querySelector('.imagemIncorreta1').value;
  imagemIncorreta2 = document.querySelector('.imagemIncorreta2').value;
  imagemIncorreta3 = document.querySelector('.imagemIncorreta3').value;
  if(tituloDaPergunta1.length < 20){
    alert('O titulo tem que ter no minimo 20 letras');
  }
  else{
    tituloDaPergunta1 = tituloDaPergunta1;
    if(validaCor(corDeFundo1) === false){
      alert('Insira uma cor hexadecimal');
    }
    else{
      corDeFundo1 = corDeFundo1;
      if(validURL(imagemDaRespostaCerta) === false){
        alert('URL inválida');
      }
      else{
        imagemDaRespostaCerta = imagemDaRespostaCerta;
        if(respostaCerta === ''){
          alert('Insira a resposta correta');
        }
        else{
          respostaCerta = respostaCerta;
          if(respostaIncorreta1 === '' && respostaIncorreta2 === '' 
          && respostaIncorreta3 === ''){
              alert('Insira pelo menos uma resposta errada');
            }
          else{
            respostaIncorreta1 = respostaIncorreta1;
            respostaIncorreta2 = respostaIncorreta2;
            respostaIncorreta3 = respostaIncorreta3;
            if(validURL(imagemIncorreta1) === false && validURL(imagemIncorreta2) === false
              && validURL(imagemIncorreta3) === false){
                alert('Insira uma URL válida');
              }
              else{
                imagemIncorreta1 = imagemIncorreta1;
                imagemIncorreta2 = imagemIncorreta2;
                imagemIncorreta3 = imagemIncorreta3;
                prosseguirParaNiveis();
              }  
          }
        }
      }
    }
   }
}

// condições para que os nivei seja aceito 
function quizzCriado(){
  tituloDoNivel = document.querySelector('.tituloDoNivel1').value;
  porcentagem = document.querySelector('.porcentagemDoNivel1').value;
  imagemDoNivel = document.querySelector('.imagemDoNivel1').value;
  descricaoDoNivel = document.querySelector('.descricaoDoNivel1').value;
  if(tituloDoNivel.length < 10){
    alert('No minino 10 letras pro titulo');
  }
  else{
    tituloDoNivel = tituloDoNivel;
    if(porcentagem > 0 || porcentagem < 100){
      alert('Porcentagem precisa estar entre 0 a 100');
    }
    else{
      porcentagem = porcentagem;
      if(validURL(imagemDoNivel) === false){
        alert('URL inválida');
      }
      else{
        imagemDoNivel = imagemDoNivel;
        if(descricaoDoNivel.length < 30){
          alert('Descrição no minímo de 30 letras');
        }
        else{
          descricaoDoNivel = descricaoDoNivel;
          criaObjetoDoQuizz();
          finalizaQuizz();
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

function validaCor(str){
  var pattern = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
  return !!pattern.test(str);
}

function criaObjetoDoQuizz(){
  let quizzCriadoPeloUsuario = {
    title: tituloNovo,
    image: imagemNova,
    questions: [
      {
        title: tituloDaPergunta1,
        color: corDeFundo1,
        answers: [
          {
            text: respostaCerta,
            image: imagemDaRespostaCerta,
            isCorrectAnsewrs: true
          },
          {
            text: respostaIncorreta1,
            image: imagemIncorreta1,
            isCorrectAnswer: false
          },
          {
            text: respostaIncorreta2,
            image: imagemIncorreta2,
            isCorrectAnswer: false
          },
          {
            text: respostaIncorreta3,
            image: imagemIncorreta3,
            isCorrectAnswer: false
          }
        ],
        levels:
          {
            title: tituloDoNivel,
            image: imagemDoNivel,
            text: descricaoDoNivel,
            minValue: porcentagem
          }
      }
    ]
  }
  console.log(quizzCriadoPeloUsuario);
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

//Habilita o usario a prosseguir para os niveis 
function prosseguirParaNiveis(){
  let criaNiveis = document.querySelector('.perguntas');
  criaNiveis.classList.add('escondida');

  let niveis = document.querySelector('.niveis');
  niveis.classList.remove('escondida');

}
//Habilita a tela final 
function finalizaQuizz(){
  let quizzFinalizado = document.querySelector('.niveis');
  quizzFinalizado.classList.add('escondida');

  let fimDoQuizz = document.querySelector('.telaFinal');
  fimDoQuizz.classList.remove('escondida');
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