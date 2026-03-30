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
document.addEventListener('DOMContentLoaded', () => {
    // JavaScript que corresponde ao desafio 1 o nome da variavel que tem os valores esperados
    // tem que ser igual ao nome dado no id do input do html
    const respostaCorreta = {
        desafio_input1: '24',
        desafio_input2: '12'
    };
    
    Object.keys(respostaCorreta).forEach(idInput => {
        const input = document.getElementById(idInput);

        if(input){
            input.addEventListener('blur', () => {
                const valorDigitado = input.value.trim();
                const palavraEsperada = respostaCorreta[idInput]

                if (valorDigitado === ''){
                    input.style.borderColor = '';
                    input.style.backgroundColor = '';
                    return;
                }
                else if(valorDigitado === palavraEsperada){
                    input.style.borderColor = 'green';
                    input.style.backgroundColor = '#27c227ff';
                    tocarAcertoOuErro('acerto');
                }else{
                    input.style.borderColor = 'red';
                    input.style.backgroundColor = '#c03c3cff';
                    tocarAcertoOuErro('erro');
                }
            });
        }

    });
})