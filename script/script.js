let urlBase = 'https://mock-api.driven.com.br/api/v4/buzzquizz';
let quizzes;
let infosIniciais;
let tituloDoQuizz;
let quantidadeDePerguntas;
let quantidadeDeNiveis;

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
    <li class="quizz">
     <img src="${quiz.image}" alt="">
      <p>${quiz.title}</p>
      <div class="degradeQuizz"></div>
    </li>
    `
  ));
}


function criarQuizz(){
  
  let criaQuizz = document.querySelector('.paginaInicial');
  criaQuizz.classList.add('escondida');

  const telaInicial = document.querySelector('.informacoesIniciais');
  telaInicial.classList.remove('escondida');
}

let tituloNovo;
let qntPer;
let qntNiv;
let imagemNova;
function irParaPerguntas(){
  
  tituloDoQuizz = document.querySelector('.titulo').value;
  quantidadeDePerguntas = document.querySelector('.qntdDePerguntas').value;
  quantidadeDeNiveis = document.querySelector('.qntdDeNiveis').value;
  if(tituloDoQuizz.length < 20 || tituloDoQuizz.length > 65){
    alert("Dados Inválidos");
  }
  else{
    tituloNovo = tituloDoQuizz;
    console.log(tituloNovo);
    // prosseguir();
  }

   exemplo();

  if(quantidadeDePerguntas < 3){
    alert('Digite um numero/No minímo 3');
  }
  else{
    qntPer = quantidadeDePerguntas;
    console.log(quantidadeDePerguntas);
    // prosseguir();
  }
  
  if(quantidadeDeNiveis < 3){
    alert('Digite um numero/No minímo 3');
  }
  else{
    qntNiv = quantidadeDeNiveis;
    console.log(quantidadeDeNiveis);
    // prosseguir();
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

function exemplo() {
    imagem = document.querySelector('.imagem').value
   if(validURL(imagem) === false) {
     alert('URL inválida');
   }
   else{
    imagemNova = imagem;
    prosseguir();
   }
}

function prosseguir(){
  if(tituloNovo !== undefined){
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
