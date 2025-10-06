document.addEventListener('DOMContentLoaded', () => {
    const imagemPalavras = [
        // arry de objetos que representa a imagem com o id utilizado para encontrar o elemento DOM do JavaScript
        // o nome diz de qual figura é aquele id
        {id : 'lapis', nome: 'lápis'},
        {id : 'relogio', nome: 'relógio'},
        {id : 'alicate', nome: 'alicate'},
        {id : 'medico', nome: 'médico'},
        {id : 'celular', nome: 'celular'},
        {id : 'moeda', nome: 'moeda'},
        {id : 'batom', nome: 'batom'},
        {id : 'calculadora', nome: 'calculadora'},
        {id : 'lampada', nome: 'lampada'},
        {id : 'martelo', nome: 'martelo'},
        {id : 'perfume', nome: 'perfume'},
        {id : 'geladeira', nome: 'geladeira'}
    ];

    imagemPalavras.forEach(foto => {
        const imagem = document.getElementById(foto.id);
        if(imagem){
            imagem.addEventListener('click', () => {
                emitirSomDaImagem(foto.nome);
            });
        }
    });

    const palavrasCorretas = {
        // Cria um objeto onde a chave é o id da imagem e o valor é a palavra
        // correta esperada
        lapis: 'LAPIS',
        relogio: 'RELOGIO',
        alicate: 'ALICATE',
        medico: 'MEDICO',
        celular: 'CELULAR',
        moeda: 'MOEDA',
        batom:'BATOM',
        calculadora: 'CALCULADORA',
        lampada: 'LAMPADA',
        martelo: 'MARTELO',
        perfume: 'PERFUME',
        geladeira: 'GELADEIRA',
    };

    Object.keys(palavrasCorretas).forEach(idImagem => {
        // para cada imagem busca o campo de input associado ao id do input
        const input = document.getElementById(`input-${idImagem}`);

        if (input){
            // se campo input existir, adiciona o eventp blur que desabilita o campo quando o usuário sai
            input.addEventListener('blur', () => {
                // remove os espaços entre as letras e transforma o texto digitado em maiúsculas
                const valorDigitado = input.value.trim().toUpperCase();
                // recupera a palavra correta esperada
                const palavraEsperada = palavrasCorretas[idImagem];
                if (valorDigitado === ''){
                    input.style.borderColo = '';
                    input.style.backgroundColor = '';
                    return;
                }
                else if(valorDigitado === palavraEsperada){
                    input.style.borderColor = 'green';
                    input.style.backgroundColor = '#d4fcd4';
                    tocarAcertoOuErro('acerto');
                }
                else{
                    input.style.borderColor = 'red';
                    input.style.backgroundColor = '#fcd4d4';
                    tocarAcertoOuErro('erro');
                }
            });
        }

    });
});

function emitirSomDaImagem(palavra){
    fetch('/nuncaetardeparaaprender/GerarAudioAPIView/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({palavra:palavra})
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
    .catch(error => {
        console.error('Erro ao emitir som da figura:', error);
    });
}

function getCSRFToken(){
    const valorCookie = document.cookie.split(';');
    for (let cookie of valorCookie){
        const [nome, valor] = cookie.trim().split('=');
        if (nome === 'csrftoken') {
            return valor;
        }
    }
    return null
}

// tocar som de acerto ou erro
function tocarAcertoOuErro(tipo, callback){
    let som;

    if(tipo === 'acerto'){
        som = '/static/sound/acerto.mp3';
    }else if(tipo === 'erro'){
        som = '/static/sound/erro.mp3';
    }

    const tocarSom = new Howl({
        src: [som],
        onload: () => {
            tocarSom.play();
        },
        onend: () => {
            if(callback) callback();
        }
    });
}