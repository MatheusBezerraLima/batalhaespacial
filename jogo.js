
const tabela = document.querySelector('.tabela');
var score = document.querySelector('.score')
var objetivo = document.querySelector('.objetivo')
var dica = document.querySelector('.info-pontuacao')
var pontos = document.querySelector('.pontos')
var c_ini = 0
var c_viradas = 0

score.innerHTML = 150;

// Gerar um objetivo aleatório ou escolhido
do {
var meta =  Math.floor(Math.random() * (800 - 300) + 300)
} while(meta % 5 != 0)
            
objetivo.innerHTML = meta



// array com as imagens
const cartas = [
    'foguete' ,
    'nave-espacial2' ,
    'nave-espacial2',
    'nave-espacial3' ,
    'astronauta' ,
    'meteoro' ,
    'estrela' ,
    'estrela' ,
    'estrela' ,
    'estrela' ,  
]

// Testando se o jogo acabou ou não 
const PerdeuGanhou = (c_ini) => {
    if(score.innerHTML <= 0 || c_ini == 100 & score.innerHTML != meta ){
        alert('MAIS SORTE NA PRÓXIMA VEZ!')
        window.location.reload()
    }else if(score.innerHTML >= meta){
        alert('PARABÉNS, VOCÊ GANHOU!!')
        window.location.reload()

    }
}

// Função para criar um elemento e adicionar uma class nele usando os parâmetros da função createCards()
const createElement = (tag, classe) => {
    const elemento = document.createElement(tag, classe)
    elemento.className = classe;
    return elemento; // return para retornar o elemento para ser armazenado na variavel target.
}
// Pontos ganhos ao virar a carta
const Pontos = () => {
    pontos.innerHTML = ''
}
// função para revelar as cartas que não foram reveladas
const revelarCarta = ({target}) => {

    // condicional para caso a carta ja esteja virada( caso ela ja possua a class revelar-carta)
    if(target.parentNode.className.includes('revelar-carta')){
        return;
    }else{
        target.parentNode.classList.add('revelar-carta') // recuperando o pai do elemento que ativou o evento e adicionando a class revelar-carta a ele.
        // teste para saber se todas as cartas ja foram viradas:
      
        var atributo = target.parentNode.getAttribute('data-character');

        var scoreAnt = score.innerHTML;
        c_viradas = c_ini + 1
        c_ini = c_viradas
        console.log(c_ini)
            switch(atributo){
            case 'foguete':
                        score.innerHTML = Number(scoreAnt) + 15
                        pontos.innerHTML = '+ 15'
                        setTimeout(Pontos, 500)
                        break;
                    case 'nave-espacial2':
                        score.innerHTML = Number(scoreAnt) + 30
                        pontos.innerHTML = '+ 30'
                        setTimeout(Pontos, 500)
                        break;
                    case 'nave-espacial3':
                        score.innerHTML = Number(scoreAnt) + 50
                        pontos.innerHTML = '+ 50'
                        setTimeout(Pontos, 500)
                        break;
                    case 'meteoro':
                        score.innerHTML = Number(scoreAnt) - 50
                        pontos.innerHTML = '- 80'
                        setTimeout(Pontos, 500)

                        break;
                    case 'astronauta':
                        if(score.innerHTML < 150 ){
                            score.innerHTML = 150   
                        }
                        break;
                }
        
        PerdeuGanhou(c_ini)
        }
}


// para cada variavel (carta) - !Quantidade definida pelo arrayEmbaralhado! - chamara uma função que criara o elemento e a clas desse elemento a createElement()
const createCards = (imagem) => {
    const carta = createElement('div' , 'card');
    const frente = createElement('div' , 'face frente');
    const verso = createElement('div' , 'face verso');

    // adicionando o background a carta recebendo imagem como parametro da função LoadCards() 
    frente.style.backgroundImage = `url(./IconesBatalhaNaval/${imagem}.png)`

    carta.appendChild(frente);
    carta.appendChild(verso);

    carta.setAttribute('data-character', imagem)

    carta.addEventListener('click', revelarCarta)
   

    return carta; 
}

// Função para multiplicar o array com as imagens 10x e armazenar isso no array arrayDuplicado
const multArray = () => {
    var vetor = [...cartas]
    for (cont = 1 ; cont <= 9 ; cont++){
        vetor.push(...cartas) 
    }
    return vetor;

}

// Função que carregará as cartas do jogo
const LoadCards = () => {
  

    const arrayDuplicado = multArray();

    // Embaralhando o array usando o metodo sort que recebe um numero aleatorio sendo ele negativo ou positivo
    const arrayEmbaralhado = arrayDuplicado.sort( () => Math.random() - 0.5);

    arrayEmbaralhado.forEach(imagem => {
        const imgVerso = createCards(imagem); // enviando como parametro oq contem em cada posição do vetor(Nome da imagem), para criar o background de forma dinâmica
        tabela.appendChild(imgVerso)
    });
    
}

// mostrar a dica 
const mostrarDica= () => {
    dica.style.visibility = 'visible'
}
// remover a dica
const desaparecer = () => {
    dica.style.visibility = 'hidden'
}
LoadCards();

