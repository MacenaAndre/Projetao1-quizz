let listaquizz;
let numNiveis;
let numPerguntas;
let objetoPost = {
    id: "", 
    title: "", 
    image: "", 
    levels: [], 
    questions: []
};

function carregarPublicos() {

    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");

    promise.catch(carregouErro);
    promise.then(carregouSucesso);

    const pag1 = document.querySelector(".conteudo");
    pag1.innerHTML = `
    <div class="page1">
            <div class="quizz-usuario">
               <p class="texto-usuario">Você não criou nenhum quizz ainda :(</p>
               <div class="botao-criar" onclick="renderizarPaginaTresUm()">Criar Quizz</div>
            </div>
            <div class="quizz-publico">
                <p class="titulo-publico">Todos os Quizzes</p>
                <div class="quizzes">
                    <!-- adicionar imagem de loading depois -->
                </div>
            </div>
        </div>
    `
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
            <div class="degrade"></div>
            <div class="centralizar-titulo">
                <p class="titulo-quizz">${listaquizz[i].title}</p>
            </div>    
        </div>
        `
    }
    
}
//------------executar aqui
carregarPublicos();

function renderizarPaginaTresUm(){
    document.querySelector('.conteudo').innerHTML = 
    `
    <div class="page3-1">
        <h3>Comece pelo começo</h3>
        <div class="campo informacoes">
            <input class="titulo" type="text" placeholder="Título do seu quizz">
            <input class="url-quizz" type="text" placeholder="URL da imagem do seu quizz">
            <input class="perguntas-quizz" type="text" placeholder="Quantidade de perguntas do quizz">
            <input class="niveis-quizz" type="text" placeholder="Quantidade de níveis do quizz">
        </div>
        <div class="botao-informacoes" onclick="avancaPerguntas()">
            Prosseguir pra criar perguntas
        </div>
    </div>
    `
}
function renderizarPaginaTresDois(){
    document.querySelector('.conteudo').innerHTML += `<h3>Crie suas perguntas</h3>`
    for(let i = 0; i < numPerguntas;i++){
        document.querySelector('.conteudo').innerHTML += 
            `<div class="page3-2">
            
        
            <div class="campo">
                <div class="campo-topo" onclick="selecionarPergunta(this)">
                    <h4>Pergunta ${i+1}</h4>
                    <img  src="./images/Vector.png" alt="">
                </div>
                <div class="campo-corpo escondido">
                    <div class="campo-perguntas">
                    
                        <input type="text" class="titulo" placeholder="Texto da pergunta">
                        <input type="text" class="hexa" placeholder="Cor de fundo da pergunta">
                    
                </div>
                
                    <div class="campo-perguntas">
                        <h4>Resposta correta</h4>
                        <input type="text" placeholder="Resposta correta">
                        <input type="text" placeholder="URL da imagem">
                    </div>
                
                    <div class="campo-perguntas">
                        <h4>Respostas incorretas</h4>
                        <input type="text" placeholder="Resposta incorreta 1">
                        <input type="text" placeholder="URL da imagem 1">
                    </div>
                    
                    <div class="campo-perguntas">
                        <input type="text" placeholder="Resposta incorreta 2">
                        <input type="text" placeholder="URL da imagem 2">
                    </div>
                    
                    <div class="campo-perguntas">
                        <input type="text" placeholder="Resposta incorreta 3">
                        <input type="text" placeholder="URL da imagem 3">
                    </div>
                
                </div>
                
                
            </div>    
            </div>
        `
    }
    document.querySelector('.conteudo').innerHTML += 
        `<div class="botao-informacoes" onclick="avancaFim()">
              Prosseguir pra criar níveis
        </div>  
        `
    
}
function avancaPerguntas(){
    if(verificarInformacoesBasicas()){
        document.querySelector('.conteudo').innerHTML = ''
        renderizarPaginaTresDois();
    }  
    console.log(objetoPost);
}
function verificarInformacoesBasicas(){
    const titulo = document.querySelector(".titulo").value;
    const url = document.querySelector(".url-quizz").value;
    const perguntas = document.querySelector(".perguntas-quizz").value;
    const niveis = document.querySelector(".niveis-quizz").value;

    if(titulo.length < 20 || titulo > 65){
        alert('O título precisa ter entre 20 e 65 caracteres.');
        return false;
    }
    if(!url.includes('https://')){
        alert('Formato de imagem inválido, digite imagens em URL');
        return false;
    }
    if(niveis < 2){
        alert('O número mínimo de níveis é 2.');
        return false;
    }
    if(perguntas < 3){
        alert('O número mínimo de perguntas é 3.');
        return false;
    }
    
    objetoPost.title = titulo;
    objetoPost.image = url;
    numNiveis = Number(niveis);
    numPerguntas = Number(perguntas);
    objetoNiveis(numNiveis);
    objetoPerguntas(numPerguntas);

    return true;
}
function objetoNiveis(numero) {
    for(let i = 0; i < numNiveis; i++) {
        objetoPost.levels.push({
            title: "",
            image: "",
            text: "",
            minValeu: 0
        })
    }
    console.log(objetoPost.levels);
}
function objetoPerguntas(numero) {
    for(let i = 0; i < numPerguntas; i++) {
        objetoPost.questions.push({
            title: "",
            color: "",
            answers: []
        })
    }
    console.log(objetoPost.questions);
}
function renderizarPaginaTresTres() {
    document.querySelector('.conteudo').innerHTML = `<h3>Agora, decida os níveis!</h3>`
    for(let i = 0; i < numNiveis; i++) {
    document.querySelector(".conteudo").innerHTML += `
        <div class="page3-3">
            
                <div class="campo">
                    <div class="campo-topo" onclick="selecionarPergunta(this)">
                        <div class="campo-niveis nivel${i}">
                        <h4>Nível ${i + 1}</h4>
                    </div>
                    <div class="campo-corpo escondido">
                        <input class="titulo-nivel" type="text" placeholder="Título do nível">
                        <input class="pctg-nivel"type="text" placeholder="% de acerto mínima">
                        <input class="url-nivel" type="text" placeholder="URL da imagem do nível">
                        <input class="descricao-nivel" type="text" placeholder="Descrição do nível">
                    </div>
                </div>    
        </div>
    `;
    }
    document.querySelector(".conteudo").innerHTML +=  `
       <div class="botao-informacoes" onclick="">
           Finalizar Quizz
        </div>
        `  
}
function avancaFim() {
        renderizarPaginaTresTres()
}
function verficiarNiveis () {

    for(i = 0; i < numNiveis; i++) {
        let niveis = document.querySelector(`.nivel${i}`);
        const titulo = niveis.querySelector(".nivel.titulo-nivel").value;
        const url = niveis.querySelector(".url-nivel").value;
        const porcentagem = niveis.querySelector(".pctg-nivel").value;
        const descricao = niveis.querySelector(".descricao-nivel").value;

    if(titulo.length < 10)  {
        alert('O título precisa ter pelo menos 10 caractéres.');
        return false;
    }
    if(!url.includes('https://')){
        alert('Formato de imagem inválido, digite imagens em URL');
        return false;
    }
    if(porcentagem >= 0 && porcentagem <=100){
        alert('Número inválido, digite um numero de 0 a 100.');
        return false;
    }
    if(descricao.length < 30){
        alert('O número mínimo de perguntas é 30.');
        return false;
    }
}
    return true;
}
function renderizarpaginatresquatro() {
    document.querySelector('.conteudo').innerHTML = `<p>alo</p>`
}
function selecionarPergunta(elemento){
    const pai = elemento.parentNode;
    pai.querySelector('.campo-corpo').classList.toggle('escondido')
}
