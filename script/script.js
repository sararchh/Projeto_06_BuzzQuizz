let urlBase = 'https://mock-api.driven.com.br/api/v4/buzzquizz';
let quizzes;

let pergunta;
let quizzesNoArmazenamento;
let ultimoIdQuizz;

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

setTimeout(buscarTodosQuizzes, 1000);
setTimeout(buscarSeusQuizzes, 1000);

function buscarSeusQuizzes() {
  const listarSeusQuizzes = document.querySelector('.listarSeusQuizzes');
  const ulQuizzes = document.querySelector('.seusQuizzes');
  const criarQuizz = document.querySelector('.criarQuizz');

  let dataGet = localStorage.getItem("_quizzes");
  quizzesNoArmazenamento = JSON.parse(dataGet);

  if (quizzesNoArmazenamento !== null) {
    listarSeusQuizzes.classList.remove('escondida');
    criarQuizz.classList.add('escondida');
  }

}

function buscarTodosQuizzes() {
  const promisse = axios.get(`${urlBase}/quizzes`);
  promisse.then(listaDeQuizzes);
}

listaDeQuizzes();

function listaDeQuizzes(response) {
  quizzes = response.data;

  renderizarTodosQuizzes();
}

function renderizarTodosQuizzes() {
  let meusQuizzes = [];
  let outrosQuizzes = [];

  if (!quizzesNoArmazenamento) {
    outrosQuizzes = quizzes;
  } else {
    meusQuizzes = quizzes.filter((item) => quizzesNoArmazenamento.includes(item.id));
    outrosQuizzes = quizzes.filter((item) => !quizzesNoArmazenamento.includes(item.id));
  }

  const ulQuizzes = document.querySelector('.quizzes');
  const ulSeusQuizzes = document.querySelector('.seusQuizzes');

  meusQuizzes.map((quiz) => (
    ulSeusQuizzes.innerHTML += `
    <li class="quizz" onclick="pegaQuiz(${quiz.id})">
     <img src="${quiz.image}" alt="imagem do quiz">
     <p>${quiz.title}</p>
   </li>
    `
  ));

  outrosQuizzes.map((quiz) => (
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
function pegaQuiz(idQuiz) {
  buscarUmQuizz(idQuiz);
}

buscarUmQuizz();

function buscarUmQuizz(id) {
  const promisse = axios.get(`${urlBase}/quizzes/${Number(id)}`);
  promisse.then(quizzChegou);
}

function quizzChegou(resposta) {
  buscarQuizz = resposta.data;
  renderizarPerguntas(buscarQuizz);
}

// chama a tela de criação
function criarQuizz() {

  let criaQuizz = document.querySelector('.paginaInicial');
  criaQuizz.classList.add('escondida');

  let escondeResposta = document.querySelector('.respostasQuizzes');
  escondeResposta.classList.add('escondida');
  
  let telaInicial = document.querySelector('.informacoesIniciais');
  telaInicial.classList.remove('escondida');
}

// condições para que o quizz seja aceito
function irParaPerguntas() {
  tituloDoQuizz = document.querySelector('.titulo').value;
  imagem = document.querySelector('.imagem').value
  quantidadeDePerguntas = document.querySelector('.qntdDePerguntas').value;
  quantidadeDeNiveis = document.querySelector('.qntdDeNiveis').value;
  if (tituloDoQuizz.length < 20 || tituloDoQuizz.length > 65) {
    alert("O título deve ter entre 20 a 65 letras");
  }
  else {
    tituloNovo = tituloDoQuizz;
    if (quantidadeDePerguntas < 3) {
      alert('Digite um numero/No minímo 3');
    }
    else {
      qntPer = quantidadeDePerguntas;
      if (quantidadeDeNiveis < 3) {
        alert('Digite um numero/No minímo 3');
      }
      else {
        qntNiv = quantidadeDeNiveis;
        if (validURL(imagem) === false) {
          alert('URL inválida');
        }
        else {
          imagemNova = imagem;
          prosseguir();
          renderizarPerguntasDoUsuario();
        }
      }
    }
  }

}

function renderizarPerguntasDoUsuario() {

  const perguntas = document.querySelector('.perguntas');
  const perguntasDoUsuario = document.querySelector('.perguntas .criacaoDePerguntas .todasAsPerguntas');


  for (let i = 0; i < qntPer; i++) {
    perguntasDoUsuario.innerHTML += `<div class="pergunta caixaDeCriacao ">
    <div class="formuleAPergunta">
      <a>Pergunta ${i + 1}</a>
      <input class = "tituloPergunta1" type="text" placeholder="Texto da pergunta">
      <input class="corDeFundo1" type="text" placeholder="Cor de fundo da pergunta">
    </div>

    <div class="respostaCorreta">
      <a>Resposta Correta</a>
      <input class="respostaCerta" type="text" placeholder="Resposta correta">
      <input class="imagemDaRespostaCerta" type="text" placeholder="URL da imagem">
    </div>

    <div class="respostasIncorretas">
      <a>Respostas Incorretas</a>
      <input class="respostaIncorreta1" type="text" placeholder="Resposta incorreta 1">
      <input class="imagemIncorreta1" type="text" placeholder="URL da imagem 1">
      <input class="margem respostaIncorreta2" type="text" placeholder="Resposta incorreta 2">
      <input class="imagemIncorreta2" type="text" placeholder="URL da imagem 2">
      <input class="margem respostaIncorreta3" type="text" placeholder="Resposta incorreta 3">
      <input class="imagemIncorreta3" type="text" placeholder="URL da imagem 3">
    </div>
  </div>
    `
  }

}

// condições para que a pergunta seja aceita 
function irParaNiveis() {
  const criacaoPergunta = document.querySelectorAll('.todasAsPerguntas .pergunta');

  pergunta = {
    title: tituloDoQuizz,
    image: imagem,
    questions: [],
    levels: []
  }


  for (i = 0; i < criacaoPergunta.length; i++) {

    let titulo = criacaoPergunta[i].querySelector('.tituloPergunta1').value;
    let color = criacaoPergunta[i].querySelector('.corDeFundo1').value;
    let respostaCerta = criacaoPergunta[i].querySelector('.respostaCerta').value;
    let imagemDaRespostaCerta = criacaoPergunta[i].querySelector('.imagemDaRespostaCerta').value;
    let respostaIncorreta1 = criacaoPergunta[i].querySelector('.respostaIncorreta1').value;
    let imagemIncorreta1 = criacaoPergunta[i].querySelector('.imagemIncorreta1').value;
    let respostaIncorreta2 = criacaoPergunta[i].querySelector('.respostaIncorreta2').value;
    let imagemIncorreta2 = criacaoPergunta[i].querySelector('.imagemIncorreta2').value;
    let respostaIncorreta3 = criacaoPergunta[i].querySelector('.respostaIncorreta3').value;
    let imagemIncorreta3 = criacaoPergunta[i].querySelector('.imagemIncorreta3').value;

    if (titulo.length < 20) {
      alert(`O titulo da pergunta ${i + 1} tem que ter no minimo 20 letras`);
      return;
    }
    if (validaCor(color) === false) {
      alert(`Insira uma cor hexadecimal na pergunta ${i + 1}`);
      return;
    }
    if (validURL(imagemDaRespostaCerta) === false) {
      alert(`URL inválida ${i + 1}`);
      return;
    }
    if (respostaCerta === '') {
      alert(`Insira a resposta correta na pergunta ${i + 1}`);
      return;
    }


    let perg = {
      title: titulo,
      color: color,
      answers: [
        {
          text: respostaCerta,
          image: imagemDaRespostaCerta,
          isCorrectAnswer: true
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
      ]
    }

    pergunta.questions = [...pergunta.questions, perg]

  }
  renderizarNiveis();
}

function renderizarNiveis() {
  const informacoesIniciais = document.querySelector('.informacoesIniciais');
  const perguntas = document.querySelector('.perguntas');
  const niveis = document.querySelector('.niveis');

  informacoesIniciais.classList.add('escondida');
  perguntas.classList.add('escondida');
  niveis.classList.remove('escondida');

  const nivel = document.querySelector('.todosOsNiveis');

  for (let i = 0; i < qntNiv; i++) {
    nivel.innerHTML += `
    <div class="nivel formatacaoDeEscolha">
    <a>Nível ${i + 1}</a>
    <input class="tituloDoNivel1" type="text" placeholder="Título do nível">
    <input class="porcentagemDoNivel1" type="text" placeholder="% de acerto mínima">
    <input class="imagemDoNivel1" type="text" placeholder="URL da imagem do nível">
    <input class="descricaoDoNivel1" type="text" placeholder="Descrição do nível">
  </div>
    `;
  }
}


// condições para que os nivei seja aceito 
function quizzCriado() {
  const todosOsNiveis = document.querySelectorAll('.todosOsNiveis .nivel');


  for (i = 0; i < todosOsNiveis.length; i++) {

    let titulo = todosOsNiveis[i].querySelector('.tituloDoNivel1').value;
    let imagemNivel = todosOsNiveis[i].querySelector('.imagemDoNivel1').value;
    let descricaoDoNivel = todosOsNiveis[i].querySelector('.descricaoDoNivel1').value;
    let porcentagemDoNivel = todosOsNiveis[i].querySelector('.porcentagemDoNivel1').value;

    if (titulo.length < 10) {
      alert(`No minino 10 letras para o titulo do nivel ${i + 1}`);
      return;
    }
    if (porcentagemDoNivel < 0 || porcentagemDoNivel > 100) {
      alert(`Porcentagem precisa estar entre 0 a 100 do nivel ${i + 1}`);
      return;
    }
    if (validURL(imagemNivel) === false) {
      alert(`URL da imagem inválida do nivel ${i + 1}`);
      return;
    }
    if (descricaoDoNivel.length < 30) {
      alert(`Descrição no minímo de 30 letras do nivel ${i + 1}`);
      return;
    }


    let levelsData = {
      title: titulo,
      image: imagemNivel,
      text: descricaoDoNivel,
      minValue: porcentagemDoNivel,
    };

    pergunta.levels = [...pergunta.levels, levelsData]
  }

  criaObjetoDoQuizz();
  finalizaQuizz();

}

function validURL(str) {

  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}

function validaCor(str) {
  var pattern = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
  return !!pattern.test(str);
}

function criaObjetoDoQuizz() {
  let quizzCriadoPeloUsuario = pergunta;
  let promisse = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizzCriadoPeloUsuario);

  promisse.then((response) => {

    const { id } = response.data;

    const existeMeusQuizzes = localStorage.getItem('_quizzes');

    if (!existeMeusQuizzes || existeMeusQuizzes == undefined) {
      localStorage.setItem('_quizzes', JSON.stringify([id]));
    } else {
      const quizzesParse = JSON.parse(existeMeusQuizzes); //String para json
      localStorage.setItem('_quizzes', JSON.stringify([...quizzesParse, id])) //Seta no localStorage o que ja existe + o id
    }
  });
}

// Habilita o usuario a prosseguir com a criação de perguntas 
function prosseguir() {
  if (tituloNovo !== '') {
    if (qntPer !== '') {
      if (qntNiv !== '') {
        let criaPerguntas = document.querySelector('.informacoesIniciais');
        criaPerguntas.classList.add('escondida');

        const perguntas = document.querySelector('.perguntas');
        perguntas.classList.remove('escondida');
      }
    }
  }
}

//Habilita o usario a prosseguir para os niveis 
function prosseguirParaNiveis() {
  let criaNiveis = document.querySelector('.perguntas');
  criaNiveis.classList.add('escondida');

  let niveis = document.querySelector('.niveis');
  niveis.classList.remove('escondida');

}
//Habilita a tela final 
function finalizaQuizz() {
  let quizzFinalizado = document.querySelector('.niveis');
  quizzFinalizado.classList.add('escondida');

  let fimDoQuizz = document.querySelector('.telaFinal');
  fimDoQuizz.classList.remove('escondida');

  ultimoIdQuizz = quizzesNoArmazenamento.at(-1);
  console.log('ultimoIdQuizz', ultimoIdQuizz);

  const promisse = axios.get(`${urlBase}/quizzes/${Number(ultimoIdQuizz)}`);
  promisse.then(dadosQuizzCriado);
}

function dadosQuizzCriado(response) {
 let imagemQuiz = response.data.image;
 let titleQuiz = response.data.title;

  renderizarQuizCriadoPagFinal(imagemQuiz,titleQuiz );
}

function renderizarQuizCriadoPagFinal(imagemQuiz,titleQuiz) {
  const divSucessoQuizz = document.querySelector('.sucessoQuizz .recebeImagemDoQuizz');

  divSucessoQuizz.innerHTML += ` 
  <img class="imagemQuizz" src="${imagemQuiz}" alt="imagem quizz">
  <p>${titleQuiz}</p>
  <div class="degradeQuizzFinal"></div>`
}

function voltarParaHome() {
  window.location.reload(true);
}

function renderizarPerguntas(quizz) {
  const divListarSeusQuizzes = document.querySelector('.listarSeusQuizzes');
  const divCriarQuizz = document.querySelector('.criarQuizz');
  const divTodosOsQuizzes = document.querySelector('.todosOsQuizzes');
  const divRespostasQuizzes = document.querySelector('.respostasQuizzes');
  const escondeInformaçõesIniciais = document.querySelector('.informacoesInicais');

  // escondeInformaçõesIniciais.classList.add('escondida');
  divListarSeusQuizzes.classList.add('escondida');
  divCriarQuizz.classList.add('escondida');
  divTodosOsQuizzes.classList.add('escondida');
  divRespostasQuizzes.classList.remove('escondida');

  const ulPerguntas = document.querySelector('.respostaQuizz');
  const cabecalho = document.querySelector('.cabecalho');

  cabecalho.innerHTML += `
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
          <div>
              <div class="caixa-pergunta">
                    ${pergunta.title}
              </div>
          </div>
        `;

    // aqui é o answers
    pergunta.answers.sort(baralhador).forEach((resposta) => {
      if(resposta.isCorrectAnswer === true){
          ulPerguntas.innerHTML += `
          <div class="lado">
              <div class="caixa-resposta true " onclick="euEscolhoVoce()">
                <div class="resposta" >
                    <img src="${resposta.image}" />
                    <div class = "textoDaResposta"><span>${resposta.text}</span></div>
          <div class="lado" onclick="euEscolhoVoce(this)">
              <div class="caixa-resposta">
                <div class="resposta">
                    <img src="${resposta.image}"  />
                    <div class="textoDaResposta1">${resposta.text}</div>
                    <div class="textoDaResposta ${resposta.isCorrectAnswer} escondida">${resposta.text}</div>
                </div>
              </div>
          </div>
        `;
      }else if(resposta.isCorrectAnswer === false){
        ulPerguntas.innerHTML += `
          <div class="lado">
              <div class="caixa-resposta false" onclick="euEscolhoVoce()">
                <div class="resposta" >
                    <img src="${resposta.image}" />
                    <div class = "textoDaResposta"><span>${resposta.text}</span></div>
                </div>
              </div>
          </div>
        `;
      }
    }) //fechamento foreach das respostas

  }) // fechamento foreach das perguntas

  // aqui é o levels
  quizz.levels.forEach((level) => {
    //aqui voce busca o level e faz o inner

  }) //fechamento do foreach level

}
function baralhador() {
  return Math.random() - 0.5;
}

function  euEscolhoVoce(parametro){
  console.log(parametro);

  const esconder = document.querySelectorAll('.textoDaResposta1');
  console.log(document.querySelectorAll('.textoDaResposta1'));
  const mostrar = document.querySelectorAll('.textoDaResposta');
  for(let i = 0; i< esconder.length; i++){
    esconder[i].classList.add('escondida');
  }
  for(let j = 0; j < mostrar.length; j++){
    mostrar[j].classList.remove('escondida');
  }
}

