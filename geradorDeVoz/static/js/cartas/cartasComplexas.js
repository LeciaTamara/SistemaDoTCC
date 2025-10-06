const grid = document.querySelector('.grid');

const cartasFrente = [
    'blusa',
    'carro',
    'dinheiro',
    'pedreiro',
    'trofeu',
    'vassoura',
    'blusa_2',
    'carro_2',
    'dinheiro_2',
    'pedreiro_2',
    'trofeu_2',
    'vassoura_2'
]

const silabas = {
    blusa: 'blu',
    carro: 'car',
    dinheiro: 'di',
    pedreiro: 'pe',
    trofeu: 'tro',
    vassoura: 'vas'
};

let carta1 = '';
let carta2 = '';

const criarElemeto = (tag, nomeClasse) => {
    const elemeto = document.createElement('div');
    elemeto.className = nomeClasse
    return elemeto;
}

const verificarFimDeJogo = () => {
    const cartaDesativada = document.querySelectorAll('.card.desabilitarCard');

    if(cartaDesativada.length == 12){
        mostrarModalParabens();
    }
}

// tocar som de acerto ou erro
// Aceita o parametro callback para fazer com uma ação só seja realizada após o fim da outra
function tocarAcertoOuErro(tipo,callback){
    let som;

    if(tipo === 'acerto'){
        som = '/static/sound/acerto.mp3';
    }else if(tipo === 'erro'){
        som = '/static/sound/erro.mp3';
    }

    const tocarSom = new Howl({
        src: [som],
        // Carrega o som primeiro na página HTML
        onload: () => {
            tocarSom.play();
        },
        // esse método verifica se o método termimou para executar a função que está em callback
        onend: () => {
            if (callback) callback();
        }
    });

    // tocarSom.play()
}

const vefiricarCartas = () => {
    let primeiraCarta = carta1.getAttribute('data-cartasFrente');
    let segundaCarta = carta2.getAttribute('data-cartasFrente');
    
    // o método remove o sublihado e os numeros de 0 a 9 
    primeiraCarta = primeiraCarta.replace(/[_\d]/g,'');
    segundaCarta = segundaCarta.replace(/[_\d]/g,'');

    console.log(primeiraCarta);
    console.log(segundaCarta);

    if(primeiraCarta == segundaCarta){
        carta1.classList.add('desabilitarCard');
        carta2.classList.add('desabilitarCard');

        tocarAcertoOuErro('acerto', () => {
            clicarNaCarta(primeiraCarta, () => {
                verificarFimDeJogo();
            })
        });

        carta1 = '';
        carta2 = '';
        
    }else {
        tocarAcertoOuErro('erro');

        /* O setTimeout foi utilizado para colocar um templo de atraso para 
         desativa a classe css de revelar a carta
        */
        setTimeout(() => {
            // O método classList.remove desativa a classe css de revelar a carta
            // escondendo a frente dela novamente
            carta1.classList.remove('revelaCard');
            carta2.classList.remove('revelaCard');

            carta1 = '';
            carta2 = '';
    
        }, 600);
    }
}
// O target é utilizado para capturar o elemento que foi clicado
const revelarCard = ({target}) => {
    // O método parentNode traz a informação da carta inteira
    // Verifica se a carta já possui a classe css revelaCard se tiver não faz nada
    const carta = target.parentNode;

    if (carta.classList.contains('revelaCard') || carta.classList.contains('desabilitarCard')) {
        return;
    }

    const nomeCarta = carta.getAttribute('data-cartasFrente')

    if(carta1 == ''){
        // O método classList é utilizado para chamar a classe do css
        carta.classList.add('revelaCard');

        pegarNomeCarta(nomeCarta)

        carta1 = carta;
    }else if(carta2 == ''){
        carta.classList.add('revelaCard');
        carta2 = carta;

        vefiricarCartas();
    }
}

const criarCard = (cartasFrente) => {
    const card = criarElemeto('div', 'card');
    const front = criarElemeto('div', 'frente front');
    const verso = criarElemeto('div', 'frente verso');

    front.style.backgroundImage = `url('/static/image/silabasComplexas/${cartasFrente}.png')`

    card.appendChild(front);
    card.appendChild(verso);
    grid.appendChild(card);

    // O evento listener sever para executar a função revelarCard quando ela for clicada
    // O addEventListener é o escultador de eventos
    card.addEventListener('click', revelarCard);
    card.setAttribute('data-cartasFrente', cartasFrente);

    return card;

}

const carregarCartas = () => {
    // Esse método Math.random é responsavél por embaralhar as cartas
    // que menos 0.5 faz os valores variar de um para zero.
    // O método sort é responsavél por fazer a ordenação da lista
    const embaralharCartas = cartasFrente.sort(() => Math.random() - 0.5);
    embaralharCartas.forEach( (cartaFrente) => {
        const carta = criarCard(cartaFrente);
        grid.appendChild(carta);
    });

}

const mostrarModalParabens = () => {
    const modal = document.createElement('div');
    modal.classList.add('modal-fim');

    const conteudo = document.createElement('div');
    conteudo.classList.add('conteudo-modal');

    const titulo = document.createElement('h2');
    titulo.textContent = '🎉 Parabéns!';

    const texto = document.createElement('p');
    texto.textContent = 'Você passou para a próxima fase! Desafio 3';

    const botao = document.createElement('button');
    botao.textContent = 'Continuar';

    //variável que recebe a url do django para ser redirecionado para a página
    
    const voltarTrilha = document.getElementById('trilha').dataset.url;
    botao.addEventListener('click', () => {
        modal.remove();
        // Ação que é executada após o usuário terminar
        window.location.href = voltarTrilha;
    });

    conteudo.appendChild(titulo);
    conteudo.appendChild(texto);
    conteudo.appendChild(botao);
    modal.appendChild(conteudo);
    document.body.appendChild(modal);

    // Ativa a exibição com animação
    setTimeout(() => {
        modal.classList.add('ativo');
    }, 50); // pequeno delay para garantir que a animação seja aplicada
};

// função para emitir o som da carta
function clicarNaCarta(palavra, callback ) {
    fetch('/nuncaetardeparaaprender/GerarAudioAPIView/', {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({palavra  : palavra })
    })
    .then(response => {
        if (!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const som = new Howl({
            src: [data.som_url],
            onend: () => {
                if (callback) callback();
            }
        });
        som.play()
    });
}

// Função que pega o csrfToken
function getCSRFToken() {
    const valorCookie = document.cookie.split(';');
    for (let cookie of valorCookie){
        const [nome, valor] = cookie.trim().split('=');
        if(nome === 'csrftoken'){
            return valor;
        }
    }
    return null;
}

// função que pega o nome da palavra
const pegarNomeCarta = (nomeCarta) => {
    let pegaCarta;

    if(nomeCarta.includes('_2')){
        // método que remove o _ e 2 do palavra
        pegaCarta = nomeCarta.replace(/_2$/, '')
    }else {
        // envia somente a primeira sílaba para pegar o som da palavra.
        // Exemplo: envia ca de casa
        pegaCarta = silabas[nomeCarta]

    }
    
    clicarNaCarta(pegaCarta)
}


carregarCartas();