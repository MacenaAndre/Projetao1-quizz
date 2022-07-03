let listaquizz;
let arrayUsuario;
let numNiveis;
let numPerguntas;
let acertos = 0;
let arrayIds = [];
let objetoPost = {
    title: "", 
    image: "", 
    questions: [],
    levels: []
};


function carregarPublicos() {
    if(arrayIds === undefined){
        arrayIds = localStorage.ids;
    }
    const pag1 = document.querySelector(".conteudo");
    if(arrayIds.length > 0){
        pag1.innerHTML = 
        `  
            <div class="page1">
            <div class="quizz-usuario-pronto">
                <div class="caixa-titulo">
                    <p class="titulo-publico">Seus Quizzes</p>
                    <ion-icon name="add-circle" onclick="renderizarPaginaTresUm()"></ion-icon>
                </div>   
                <div class="quizzes-seu">
                
                </div>
            </div>
            <div class="quizz-publico">
                <p class="titulo-publico">Todos os Quizzes</p>
                <div class="quizzes">
                    <!-- adicionar imagem de loading depois -->
            
                    
                </div>
            </div>
        `
    }
    else{
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
    const promise = axios.get("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes");
    
    promise.catch(carregouErro);
    promise.then(carregouSucesso); 
    promise.then(pegaQuizzUsuario);

    arrayIds = JSON.parse(localStorage.ids);
   
}


function carregouErro (Erro) {
     alert("Erro ao carregar os quizzes!");
}

function carregouQuizzesUsuario(quizz){
    console.log(quizz)
    const elemento = document.querySelector(".quizzes-seu");
    for(let i = 0; i < localStorage.length;i++){
        elemento.innerHTML += 
        `
        <div class="quizz">
            <img class="img-quizz" src="${quizz.data.image}" alt="">
            <div class="degrade"></div>
            <div class="centralizar-titulo">
                <p class="titulo-quizz">${quizz.data.title}</p>
            </div>    
        </div>
        `
    }
}
function verificaQuizzUsuario(listaquizz){
    console.log(listaquizz.id, arrayIds)
    for(let i = 0; i < arrayIds.length;i++){
        if(listaquizz.id === arrayIds[i]){
            return `
                    <div class="quizz escondido">
                        <img class="img-quizz" src="${listaquizz.image}" alt="">
                        <div class="degrade"></div>
                        <div class="centralizar-titulo">
                        <p class="titulo-quizz">${listaquizz.title}</p>
                        </div>    
                    </div>
                    `     ;
        }
    }
    return `
    <div class="quizz">
        <img class="img-quizz" src="${listaquizz.image}" alt="">
        <div class="degrade"></div>
        <div class="centralizar-titulo">
        <p class="titulo-quizz">${listaquizz.title}</p>
        </div>    
    </div>
    `     ;
    
}

function carregouSucesso (resposta) {
    console.log(resposta.data)
    listaquizz = resposta.data;
    const elemento = document.querySelector(".quizzes:last-child");

    elemento.innerHTML = "";

    for(let i = 0; i < listaquizz.length; i++) {
        elemento.innerHTML +=  verificaQuizzUsuario(listaquizz[i])
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
        <div class="botao-informacoes" onclick="verificarInformacoesBasicas()">
            Prosseguir pra criar perguntas
        </div>
    </div>
    `
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
    objetoNiveis();
    objetoPerguntas();
    renderizarPaginaTresDois();
}
function objetoNiveis() {
    for(let i = 0; i < numNiveis; i++) {
        objetoPost.levels.push({
            title: "",
            image: "",
            text: "",
            minValue: 0
        })
    }
    console.log(objetoPost.levels);
}
function objetoPerguntas() {
    for(let i = 0; i < numPerguntas; i++) {
        objetoPost.questions.push({
            title: "",
            color: "",
            answers: []
        })
    }
    console.log(objetoPost.questions);
}
function renderizarPaginaTresDois(){
    document.querySelector('.conteudo').innerHTML = `<h3>Crie suas perguntas</h3>`
    for(let i = 0; i < numPerguntas;i++){
        document.querySelector('.conteudo').innerHTML += 
            `<div class="page3-2">
            
        
            <div class="campo pergunta${i}">
                <div class="campo-topo" onclick="selecionarPergunta(this)">
                    <h4>Pergunta ${i+1}</h4>
                    <img  src="./images/Vector.png" alt="">
                </div>
                <div class="campo-corpo escondido ">
                    <div class="campo-perguntas">
                    
                        <input type="text" class="titulo-pergunta" placeholder="Texto da pergunta">
                        <input type="text" class="hexa-pergunta" placeholder="Cor de fundo da pergunta">
                    
                </div>
                
                    <div class="campo-perguntas">
                        <h4>Resposta correta</h4>
                        <input type="text" class="resposta-correta" placeholder="Resposta correta">
                        <input type="text" class="url-correta" placeholder="URL da imagem">
                    </div>
                
                    <div class="campo-perguntas">
                        <h4>Respostas incorretas</h4>
                        <input type="text" class="resposta-incorreta1" placeholder="Resposta incorreta 1">
                        <input type="text" class="url-incorreta1" placeholder="URL da imagem 1">
                    </div>
                    
                    <div class="campo-perguntas">
                        <input type="text" class="resposta-incorreta2" placeholder="Resposta incorreta 2">
                        <input type="text" class="url-incorreta2" placeholder="URL da imagem 2">
                    </div>
                    
                    <div class="campo-perguntas">
                        <input type="text" class="resposta-incorreta3" placeholder="Resposta incorreta 3">
                        <input type="text" class="url-incorreta3" placeholder="URL da imagem 3">
                    </div>
                
                </div>
                
                
            </div>    
            </div>
        `
    }
    document.querySelector('.conteudo').innerHTML +=       
        `<div class="botao-informacoes" onclick="verificarPerguntas()">
        Prosseguir pra criar níveis
        </div>  
        `
    
}
function verificarPerguntas(){
    for(let i = 0; i < numPerguntas; i++){
        let caixaPergunta = document.querySelector(`.pergunta${i}`);
        const tituloPergunta = caixaPergunta.querySelector('.titulo-pergunta').value;
        const hexaPergunta = caixaPergunta.querySelector('.hexa-pergunta').value;
        const respostaCorreta = caixaPergunta.querySelector('.resposta-correta').value;
        const urlCorreta = caixaPergunta.querySelector('.url-correta').value;
        const respostaIncorreta1 = caixaPergunta.querySelector('.resposta-incorreta1').value;
        const urlIncorreta1 = caixaPergunta.querySelector('.url-incorreta1').value;
        const respostaIncorreta2 = caixaPergunta.querySelector('.resposta-incorreta2').value;
        const urlIncorreta2 = caixaPergunta.querySelector('.url-incorreta2').value;
        const respostaIncorreta3 = caixaPergunta.querySelector('.resposta-incorreta3').value;
        const urlIncorreta3 = caixaPergunta.querySelector('.url-incorreta3').value;

        if(tituloPergunta.length < 20){
            alert(`Caixa ${i+1}: O título precisa ter no mínimo 20 caracteres.`);
            return;
        }
        if(!validarHexa(hexaPergunta)){
            alert('Cor inválida');
            return;
        }
        if(respostaCorreta === null){
            alert(`Caixa ${i+1}: Resposta correta não pode estar vazia`);
            return;
        }
        if(!urlCorreta.includes('https://')){
            alert(`Caixa ${i+1}: Formato da URL Correta está inválido, digite imagens em URL válidas`);
            return;
        }
        if(respostaIncorreta1 === null){
            alert(`Caixa ${i+1}: Resposta Incorreta 1 não pode estar vazia.`);
            return;
        }
        if(!urlIncorreta1.includes('https://')){
            alert(`Caixa ${i+1}: Formato da URL Incorreta 1 está inválido, digite imagens em URL válidas`);
            return;
        }
        if(respostaIncorreta2 !== ""){
            if(respostaIncorreta2.length < 20){
                alert(`Caixa ${i+1}: Resposta Incorreta 2 não pode estar vazia.`);
                return
            }
            if(!urlIncorreta2.includes('https://')){
                alert(`Caixa ${i+1}: Formato da URL Incorreta 2 está inválido, digite imagens em URL válidas`);
                return;
            }
        }
        if(respostaIncorreta3 !== ""){
            if(respostaIncorreta3.length < 20){
                alert(`Caixa ${i+1}: Resposta Incorreta 3 não pode estar vazia.`);
                return
            }
            if(!urlIncorreta3.includes('https://')){
                alert(`Caixa ${i+1}: Formato da URL Incorreta 3 está inválido, digite imagens em URL válidas`);
                return;
            }
        }   

    }
    listarPerguntas();
    renderizarPaginaTresTres();
}

function validarHexa(hexa){
    let reg=/^#([0-9a-f]{6}){1,2}$/i;
    console.log(reg.test(hexa))
    return reg.test(hexa);
}
function renderizarPaginaTresTres() {
    document.querySelector('.conteudo').innerHTML = `<h3>Agora, decida os níveis!</h3>`
    for(let i = 0; i < numNiveis; i++) {
    document.querySelector(".conteudo").innerHTML += `
        <div class="page3-3">
                <div class="campo nivel${i}">
                    <div class="campo-topo" onclick="selecionarPergunta(this)">
                        <h4>Nível ${i + 1}</h4>
                        <img  src="./images/Vector.png" alt="">
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
       <div class="botao-informacoes" onclick="verficiarNiveis()">
           Finalizar Quizz
        </div>
        `  
}
function verficiarNiveis() {

    let contador = 0;

    for(i = 0; i < numNiveis; i++) {
        let niveis = document.querySelector(`.nivel${i}`);
        const titulo = niveis.querySelector(".titulo-nivel").value;
        const url = niveis.querySelector(".url-nivel").value;
        const porcentagem = (niveis.querySelector(".pctg-nivel").value);
        const descricao = niveis.querySelector(".descricao-nivel").value;

        if(titulo.length < 10)  {
           alert(`O título precisa ter pelo menos 10 caractéres em Nivel ${i + 1}.`);
           return false;
        }
        if(porcentagem === "" || isNaN(Number(porcentagem)) || Number(porcentagem) < 0 || Number(porcentagem) > 100) {
            alert(`Porcentagem inválida Nivel ${i + 1}, digite um numero de 0 a 100.`);
            return false;
        }
        if(!url.includes('https://')){
            alert(`Formato de imagem inválido em Nivel ${i + 1}, digite imagens em URL`);
            return false;
        }
        if(descricao.length < 30){
            alert(`A descrição precisa ter pelo menos 30 caractéres em Nivel ${i + 1}.`);
            return false;
        }
        if(Number(porcentagem) === 0) {
            contador ++;
        }
    }
    if(contador !== 1) {
        alert('Uma das porcentagens precisa ser 0')
        return false;
    }
    listarNiveis();
    enviarQuizz();
}
function listarNiveis () {

    let menorporcentagem = 101;

    for(i = 0; i < numNiveis; i++) {
       let niveis = document.querySelector(`.nivel${i}`);
       const titulo = niveis.querySelector(".titulo-nivel").value;  
       const url = niveis.querySelector(".url-nivel").value;
       const porcentagem = niveis.querySelector(".pctg-nivel").value;
       const descricao = niveis.querySelector(".descricao-nivel").value;

       objetoPost.levels[i].title = titulo;
       objetoPost.levels[i].image = url;
       objetoPost.levels[i].text = descricao
       objetoPost.levels[i].minValue = Number(porcentagem);
    }
    console.log(objetoPost);
}

function enviarQuizz(){
    const promise = axios.post('https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes',objetoPost);
    promise.then( resposta =>{
        renderizarpaginaTresQuatro();    
        console.log(resposta);
        console.log(resposta.data.id);
        acumalarIds(resposta.data.id);
        console.log(localStorage);
    });
    promise.catch(()=>{
        alert('Deu erro :(');
    });
}

function acumalarIds(id){
   let idLocal = id;
   if(localStorage.length===0){
         localStorage.setItem("ids","[]");
         arrayUsuario = localStorage.ids;
         arrayUsuario = JSON.parse(arrayUsuario);
         arrayUsuario.push(idLocal);
         arrayUsuario = JSON.stringify(arrayUsuario);
         localStorage.ids = arrayUsuario;
  }	else{
        arrayUsuario = localStorage.ids;
        arrayUsuario = JSON.parse(arrayUsuario);
        arrayUsuario.push(idLocal);
        arrayUsuario = JSON.stringify(arrayUsuario);
        localStorage.ids = arrayUsuario;
  }
  arrayIds = JSON.parse(localStorage.ids);
}


function listarPerguntas(){
    for(i = 0; i < numPerguntas; i++){
        let caixaPergunta = document.querySelector(`.pergunta${i}`);
        const tituloPergunta = caixaPergunta.querySelector('.titulo-pergunta').value;
        const hexaPergunta = caixaPergunta.querySelector('.hexa-pergunta').value;
        const respostaCorreta = caixaPergunta.querySelector('.resposta-correta').value;
        const urlCorreta = caixaPergunta.querySelector('.url-correta').value;
        const respostaIncorreta1 = caixaPergunta.querySelector('.resposta-incorreta1').value;
        const urlIncorreta1 = caixaPergunta.querySelector('.url-incorreta1').value;
        const respostaIncorreta2 = caixaPergunta.querySelector('.resposta-incorreta2').value;
        const urlIncorreta2 = caixaPergunta.querySelector('.url-incorreta2').value;
        const respostaIncorreta3 = caixaPergunta.querySelector('.resposta-incorreta3').value;
        const urlIncorreta3 = caixaPergunta.querySelector('.url-incorreta3').value;
        objetoPost.questions[i].title = tituloPergunta;
        objetoPost.questions[i].color = hexaPergunta;   
        objetoPost.questions[i].answers.push({
            text:respostaCorreta,
            image:urlCorreta,
            isCorrectAnswer:true
        }); 
        objetoPost.questions[i].answers.push({
            text: respostaIncorreta1,
            image:urlIncorreta1,
            isCorrectAnswer:false
        });
        if(respostaIncorreta2 !== "" && urlIncorreta2 !== ""){
            objetoPost.questions[i].answers.push({
                text: respostaIncorreta2,
                image:urlIncorreta2,
                isCorrectAnswer:false
            }); 
        }
        if(respostaIncorreta3 !== "" && urlIncorreta3 !== ""){
            objetoPost.questions[i].answers.push({
                text: respostaIncorreta3,
                image:urlIncorreta3,
                isCorrectAnswer:false
            }); 
        }
        
        
    }
    console.log(objetoPost);
}
function renderizarpaginaTresQuatro() {
    document.querySelector('.conteudo').innerHTML = `
    <div class="page3-4">
        <h3>Seu quizz está pronto!</h3>
    
                <div class="quizz-pronto">
                    <img class="img-quizz-pronto" src="${objetoPost.image}" alt="">
                    <div class="degrade-pronto"></div>
                    <div class="centralizar-titulo-pronto">
                        <p class="titulo-quizz-pronto">${objetoPost.title}</p>
                    </div>    
                </div>

        <div class="botao-jogar" onclick="renderizarPaginaDois()">
            Acessar Quizz
        </div>  
        <h6 onclick="renderizarHome()">Voltar pra home</h6>
    </div>
    `
}
function selecionarPergunta(elemento){
    const pai = elemento.parentNode;
    pai.querySelector('.campo-corpo').classList.toggle('escondido')
}
function avancaNiveis() {
    renderizarPaginaTresTres()
}
//----------------novo-----------------
function renderizarHome() {
    document.querySelector("style").innerHTML += ""
    carregarPublicos();
}
function renderizarPaginaDois() {

    const content = document.querySelector(".conteudo");
    content.classList.add("juntar");
    content.innerHTML = `
    <div class="page2">
        <img class="capa" src="${objetoPost.image}" alt="">
        <div class="degrade2">${objetoPost.title}</div>
    </div>
    `

    for(let i = 0; i < numPerguntas; i++) {
        document.querySelector(".page2").innerHTML += `
        <div class="jogo-quizz">
            <div class="cor-quizz c${i + 1}">${objetoPost.questions[i].title}</div>
            <div class="alternativas alt${i + 1}">
            </div>    
        </div>
        `
        document.querySelector("style").innerHTML += `
            .c${i +1} {
                background-color: ${objetoPost.questions[i].color};
            }
        `
        //alterarCor(objetoPost.questions[i].color)

        for(let j = 0; j < objetoPost.questions[i].answers.length; j++) {
            document.querySelector(`.alt${i + 1}`).innerHTML += `
                <div class="alternativa numb${j + 1}" onclick="selecionarAlternativa(this)">
                    <img class="img-jogo "src="${objetoPost.questions[i].answers[j].image}" alt="">
                    <h5>${objetoPost.questions[i].answers[j].text}</h5>
                    <div class="escondido gabarito">${objetoPost.questions[i].answers[j].isCorrectAnswer}</div>
                </div>
            `
        }    
    }

    document.querySelector(".page2").innerHTML += `
        <div class="exibir-resultado">
        </div>
        <div class="botao-reiniciar" onclick="reiniciarQuizz()">
            Reiniciar Quizz
        </div>  
        <h6 class="margem" onclick="renderizarHome()">Voltar pra home</h6> 
    `
}
function selecionarAlternativa(alternativa) {
    let limitador = 0
    let resposta = alternativa.querySelector(".gabarito");
    if(resposta.innerHTML === "true") {
       console.log("boa");
       limitador ++
    } else {
       console.log("baaaad");
       limitador ++
    }
}
function alterarCor(cor) {
    let declaration = document.styleSheets[2].cssRules[45].style;
    let corfundo = declaration.setProperty("background-color", cor);
}
//function reiniciarQuizz() {document.querySelector("style").innerHTML += ""}
//exibirResultado()
function pegaQuizzUsuario(){
    for(let i = 0; i < arrayIds.length; i++){
        const promise = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${arrayIds[i]}`);
        promise.then(carregouQuizzesUsuario);
        promise.catch(carregouErro)
    }
    
}
