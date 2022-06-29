function renderizarPaginaTresUm(){
    document.querySelector('.conteudo').innerHTML = 
    `
    <div class="page3-1">
        <h3>Comece pelo começo</h3>
        <div class="campo informacoes">
            <input class="titulo-quizz" type="text" placeholder="Título do seu quizz">
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
    document.querySelector('.conteudo').innerHTML = 
    `<h1>AE</h1>`
}

function avancaPerguntas(){
    if(verificarInformacoesBasicas()){
        renderizarPaginaTresDois();
    }  
}

function verificarInformacoesBasicas(){
    const titulo = document.querySelector(".titulo-quizz").value;
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
    return true;
}