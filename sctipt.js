let paginaTresUm = ` <h3>Comece pelo começo</h3>
<div class="campo informacoes">
    <input type="text" placeholder="Título do seu quizz">
    <input type="text" placeholder="URL da imagem do seu quizz">
    <input type="text" placeholder="Quantidade de perguntas do quizz">
    <input type="text" placeholder="Quantidade de níveis do quizz">
</div>
<div class="botao-informacoes">
    <span>Prosseguir pra criar perguntas</span> 
</div>`;

let listaquizz;

function carregarPublicos() {

    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");

    promise.catch(carregouErro);
    promise.then(carregouSucesso);
}
function carregouErro (Erro) {
     alert("deu ruim");
}
function carregouSucesso (resposta) {
    console.log(resposta.data)
    listaquizz = resposta.data;
    const elemento = document.querySelector(".quizzes");

    elemento.innerHTML = "";

    for(let i = listaquizz.length - 6; i < listaquizz.length; i++) {
        elemento.innerHTML += `
        <div class="quizz">
            <img class="img-quizz" src="${listaquizz[i].image}" alt="">
           <p class="titulo-quizz">${listaquizz[i].title}</p>
        </div>
        `
    }
    
}
carregarPublicos();