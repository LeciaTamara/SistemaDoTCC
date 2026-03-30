window.onload = function(){
    const vogais = document.querySelectorAll('#areaLetras .letraMovel');
    const paresDeVogais =  document.querySelectorAll('#areaLetras .letraFixa');
    // usar o espalhador spread para espalhar os elementos do array na tela
    const vogaisEmbaralhada = [...vogais, ...paresDeVogais];

    //define a posição que as letras devem ocupar de acordo com o tamanho do container
    const container = document.getElementById('areaLetras');
    const larguraCaixa = container.clientWidth;
    const alturaCaixa = container.clientHeight
    // pega a posição de cada letra
    const posicoesDaLetra = [];

    vogaisEmbaralhada.forEach(vogal => {
        let larguraTela, alturaTela;
        let distanciaEntreAletra = 80; //menor distância que as letras podem ter
        let tentativasMinimaDeEspacamento = 0; //quantidade minima de tentativas para distânciar uma letra da outra
        let tentativasMaximaDeEspacamento= 100; //quantidade máxima de tentativas para distânciar uma letra da outra
        var distanciaDaLetra

        do{
            // o Math.rando gera números 0 a 1, e os seus valores foram utilizados para determinar a posição que cada
            // letra ficará na tela e o seu valor é mutiplicado pelo  o valor do tamanho da tela do navegador
            // (window.innerWidth) menos 180
            larguraTela = Math.random() * (larguraCaixa - 80);
            alturaTela = Math.random() * (alturaCaixa - 80);
            tentativasMinimaDeEspacamento++;

            // o método every verifica se todos os elementos do array atendem a codição definida que a letra ocupar uma
            // distância de 80px de outra letra  
            distanciaDaLetra = posicoesDaLetra.every(posicao => {
                // coodernada de cada letra de acordo com a sua largura e altura
                // calcula a diferença entre a posição nova e a posição antiga
                const distanciaX = posicao.largura - larguraTela;
                const distanciaY = posicao.altura - alturaTela;
                // calcula a distânciaX e a distânciaY, e retorna true se a distância for maior que o valor minimo definido
                // na variável distanciaEntreAletra
                const distancia = Math.sqrt(Math.pow(distanciaX, 2) + Math.pow(distanciaY, 2));
                return distancia > distanciaEntreAletra;
            });
        } while (!distanciaDaLetra && tentativasMinimaDeEspacamento < tentativasMaximaDeEspacamento);
        // define a posição da letra usando css com o valor da largura tela adquirido ao usar math.Random
        vogal.style.left = `${larguraTela}px`;
        vogal.style.top = `${alturaTela}px`;
        // adiciona essa posição ao array posicoesDaLetra, o permite que as letras respeitem o espaçamento em relação
        // a outra letra
        posicoesDaLetra.push({largura: larguraTela, altura: alturaTela});
    });
};

// interact É uma variável global da biblioteca interact.js
// Essa linha pega todos os items da tela que tem a classe letraMovel definida no css e permitir que elas sejam arrastadas
interact('.letraMovel').draggable({
    // nessa linha de dentro do listeners são adicionadas as regras que devem ser seguida quando o elemento começa a arrastar 
    listeners: {
        // start é um evento global da biblioteca interact.js, ela começa quando arrasta a letra
        start(event) {
                        // pega o texta da letra que está sendo arrastada
            const letra = event.target.innerText.trim().toUpperCase();
            clicarNaVogal(letra); // toca o som da letra
        },
        // o move é uma variável global da biblioteca interact.js e é chamada no momento em que a letra está sendo arrastada
        move(event){
                        // pega a letra que está sendo manuseada
            const letra = event.target;
                    // Calcula a nova posição no lado esquerdo ou direito.  data-x pega a posição antiga e soma quantas posiçoes foram movidas event.dx
            const x = (parseFloat(letra.getAttribute('data-x')) || 0) + event.dx;
                    // Calcula a nova posição de cima ou de baixo.  data-y pega a posição antiga e soma quantas posiçoes foram movidas event.dy
            const y = (parseFloat(letra.getAttribute('data-y')) || 0) + event.dy;
            // coloca a letra no lugar novo da tela usando as posições x e y
            letra.style.transform = `translate(${x}px, ${y}px)`;
            // guarda a posição dentro da letra
            letra.setAttribute('data-x', x);
            letra.setAttribute('data-y', y);
        }
    }
});

function tocarAcertoOuErro(tipo){
    let som;

    if(tipo === 'acerto'){
        som = '/static/sound/acerto.mp3';
    }else if(tipo === 'erro'){
        som = '/static/sound/erro.mp3';
    }

    const tocarSom = new Howl({
        src: [som],
    });
    tocarSom.play();
}

// Essa linha pega todos os items da tela que tem a classe letraMovel definida e permitir soltá-las dentro das letras que tem a classe letra fixa 
interact('.letraFixa').dropzone({
    // deixa claro que só aceita letras com a classe letraMovel
    accept: '.letraMovel',
    // A letra precisa cobrir 75% da caixa que está a outra letra para poder verificar se é válida ou não
    overlap: 0.75,
    // acontece quando a letra é colocada emcima da outra
    ondrop(event) {
        // pega a letra que estava sendo arrastada
        const letraMovel = event.relatedTarget;
        // pega a letra onde a letra que estava sendo arrastada foi colocada emcima
        const letraFixa = event.target;
                                // ver qual letra está escrita tira os espaçoes e transforma em maiúscula
        const letraMovimentada = letraMovel.innerText.trim().toUpperCase();
        // recebe a letra que será esperada
        const letreEsperada = letraFixa.getAttribute('data-letra');
        // atribui o valor data-preenchido a variável preenchido
        const preenchido = letraFixa.getAttribute('data-preenchido');

        if(preenchido === 'true'){
            alert('EssA letra já foi preenchida!');
            return;
        }

        if (letraMovimentada === letreEsperada){
            // essa linha escreve a letra na letra com a classe letraFixa
            letraFixa.innerText = letreEsperada;
            // Define a a letra com a classe letraFixa como preenchida
            letraFixa.setAttribute('data-preenchido', 'true');
            letraFixa.classList.add('acertou');
            tocarAcertoOuErro('acerto');
                            // pega a posição da letra na tela
            const fixaRect = letraFixa.getBoundingClientRect();
                                // pega a posição do quadro onde estão as letras
            const containerRect = document.getElementById('areaLetras').getBoundingClientRect();
            // calcula onde a letra deve ficar para ser considerada válida sobre a outra letra
            const destinoX = fixaRect.left - containerRect.left;
            const destinoY = fixaRect.top - containerRect.top;
            // remove os movimentos antigos da letra
            letraMovel.style.transform = 'none';
            // coloca a letra no lugar certo emcima da letar com a classe letraFixa
            letraMovel.style.left = `${destinoX}px`;
            letraMovel.style.top = `${destinoY}px`;
            // permite que a letra fique sobreposta a outra letra e vsível
            letraMovel.style.zIndex = '20';
            // adiciona a classe css que permite a letra sumir
            letraMovel.classList.add('desaparecer');
            setTimeout(() => {
                // letraFixa recebe a letra movimentada
                letraFixa.innerText = letraMovimentada
                // remove a letra Movel porque já encaixou 
                letraMovel.remove();
            }, 500);
        } else {
            letraFixa.classList.add('errou');
            tocarAcertoOuErro('erro');

            setTimeout(() => {
                letraFixa.classList.remove('errou');
            }, 800);
        }
    }
});

function clicarNaVogal(palavra){
    fetch('/GerarAudioAPIView/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },

        body: JSON.stringify({palavra : palavra})
    })
    .then(response => {
        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const som = new Howl({
            src: [data.som_url]
        });
         som.play();
    })
   
}

function getCSRFToken(){
    const valorCookie = document.cookie.split(';')
    for(let cookie of valorCookie){
        const[nome, valor] = cookie.trim().split('=');
        if(nome === 'csrftoken'){
            return valor;
        }
    }
    return null;
}
