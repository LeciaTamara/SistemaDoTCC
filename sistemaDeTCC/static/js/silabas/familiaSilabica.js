// função que pega a letra e redireciona para a família a outra tela para mostrar
// a família silabica correspondente.
//Essa função tem que fora do DOMContentLoaded, ou seja tem que ficar no escopo
function familia(letra){
    window.location.href = `/familiaSilabica/?letra=${letra}`;
}

function avancarFamilia() {
    const letras = ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','X','Z'];
    const parametro = new URLSearchParams(window.location.search);
    const letraAtual = parametro.get('letra');
    const indiceLetra = letras.indexOf(letraAtual);
    const proximaLetra = letras[indiceLetra + 1];

    if (proximaLetra) {
        window.location.href = `/familiaSilabica/?letra=${proximaLetra}`;
    } else {
        //variável que recebe a url do django para ser redirecionado para a página do desafio2
        const voltarTrilha = document.getElementById('desafio2').dataset.url;
        window.location.href = voltarTrilha;
    }
}

/*O document.addEvenListener espera até que a página HTML esteja completmente carregada para carregar o javaScript */
document.addEventListener('DOMContentLoaded', () => {
    const familiasSilabica = {
       B: ['BA', 'BE', 'BI', 'BO', 'BU', 'BÃO'],
       C: ['CA', 'CE', 'CI', 'CO', 'CU', 'CÃO'],
       D: ['DA', 'DE', 'DI', 'DO', 'DU', 'DÃO'],
       F: ['FA', 'FE', 'FI', 'FO', 'FU', 'FÃO'],
       G: ['GA', 'GE', 'GI', 'GO', 'GU', 'GÃO'],
       H: ['HA', 'HE', 'HI', 'HO', 'HU', 'HÃO'],
       J: ['JA', 'JE', 'JI', 'JO', 'JU', 'JÃO'],
       K: ['KA', 'KE', 'KI', 'KO', 'KU'],
       L: ['LA','LE','LI','LO','LU','LÃO'],
       M: ['MA','ME','MI','MO','MU','MÃO'],
       N: ['NA', 'NE', 'NI', 'NO', 'NU', 'NÃO'],
       P: ['PA','PE','PI','PO','PU','PÃO'],
       Q: ['QUA','QUE','QUI','QUO','QUÃO'],
       R: ['RA','RE','RI','RO','RU','RÃO'],
       S: ['SA','SE','SI','SO','SU','SÃO'],
       T: ['TA','TE','TI','TO','TU','TÃO'],
       V: ['VA','VE','VI','VO','VU','VÃO'],
       X: ['XA','XE','XI','XO','XU','XÃO'],
       Z: ['ZA','ZE','ZI','ZO','ZU','ZÃO']

    }

    const letrasComTextoBranco = ['F', 'H', 'J', 'K', 'M', 'P', 'R', 'Z'];

    const parametro = new URLSearchParams(window.location.search);
    const letra = parametro.get('letra');

    // Atualiza o botão de microfone ao lado do botão "Avançar"
    //Reproduz o som do botão avançar de acordo com a letra
    const botaoReproduzirAvancar = document.getElementById('reproduzirAvancar');
    if (botaoReproduzirAvancar && letra) {
        if (letra === 'Z') {
            botaoReproduzirAvancar.setAttribute('data-texto', 'Clique no botão para avançar para o desafio 2');
        } else {
            botaoReproduzirAvancar.setAttribute('data-texto', 'Clique no botão para avançar para a próxima família na trilha');
        }
    }

    const corBotao = `familia-${letra}`;
    const corTitulo = `titulo-${letra}`;
    const silabaCor = `button-silaba-${letra}`;

    //reproduz o áudio do texto que está sendo criado pelo o javaScript
    const botaoReproduzirSom = document.querySelector('.reproduzir');

    if (botaoReproduzirSom && letra) {
        if(letra === 'S'){
            const textoReproduzido = `Família - ${letra}`;
            botaoReproduzirSom.setAttribute('data-texto', textoReproduzido);
        }else{
            const textoReproduzido = `Família${letra}`;
            botaoReproduzirSom.setAttribute('data-texto', textoReproduzido);
        }
    }

    // coloca o título de cada família sílabica dinamicamete
    const titulo = document.getElementById("nomeFamilia")
    if(titulo){
        titulo.textContent = `Família ${letra}`;
        titulo.classList.add(corTitulo);
    }
    
    const familiaCriada = document.getElementById("familia");

    if(familiasSilabica[letra]){
        familiasSilabica[letra].forEach(silaba => {
            const botao = document.createElement("button");
            botao.type = "button"
            botao.textContent = silaba;
            botao.classList.add('silaba', silabaCor, corBotao, 'button-silaba');
            
            if(letrasComTextoBranco.includes(letra)){
                botao.classList.add('texto-branco');
            }else{
                botao.classList.add('texto-preto');
            }
            
            
            botao.onclick = () => {
                pegarNomeSilaba(silaba)
            };
            familiaCriada.appendChild(botao);
        });
    } else {
        familiaCriada.textContent = "Família não existe";
    }

    const letraSom = parametro

});

function clicarNaSilaba(palavra){
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
         console.log('URL do som:', data.som_url);
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

const pegarNomeSilaba = (nomeSilaba) => {
    const pegarSilaba = familiaSilabicaAdaptada[nomeSilaba] || nomeSilaba;
    clicarNaSilaba(pegarSilaba);
};

const familiaSilabicaAdaptada = {
        BE: 'BÉ',
        BO: 'bô',
        CI: 'CIR',
        CO: 'cô',
        DE: 'DÉ',
        DO: 'DÓ',
        FA: 'FÁ',
        FI: 'FIH',
        FO: 'FÓ',
        GÃO: 'Gãu',
        HA: 'A',
        HE: 'É',
        HI: 'I',
        HO: 'O',
        HU: 'U',
        HÃO: 'ÃO',
        JI: 'jir',
        KE: 'quer',
        KI: 'qui',
        KO: 'CÓ',
        LA: 'LÁ',
        LE: 'LÉ',
        LO: 'LÓ',
        MA: 'má',
        ME: 'mé',
        MO: 'mó',
        NI: 'NÍ',
        NO: 'NÓ',
        PE: 'PÉ',
        PO: 'PÓ',
        QUE: 'QUÉ',
        SA: 'SÁ',
        SE: 'SÉ',
        SI: 'SÍ',
        SO: 'SÓ',
        TE: 'Têr',
        TO: 'TÓ',
        VE: 'VÉ',
        VU: 'VÚ',
        XE: 'XÉ',
        XO: 'xô',

    };