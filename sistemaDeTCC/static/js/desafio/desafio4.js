/* O document.addEvenListener espera até que a página html seja carregada para disparar o evento 
'DomContentLoaded' que executa a função que exibiros botões do alfabeto 
*/
document.addEventListener('DOMContentLoaded', () => {
    const letras = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'I',
        'K', 'L', 'N', 'M', 'O', 'P', 'Q', 'R', 'S', 'T',
        'V', 'U', 'W', 'X', 'Y', 'Z'];

    const letrasDesorganizada = document.getElementById('alfabetoDesorganizado');

    letras.forEach(letra => {
        const coluna = document.createElement('div');
        //Divide o container em 2 colunas
        coluna.className = 'col2-mb3';

        const item = document.createElement('div');
        item.className = 'letra';
        item.textContent = letra;
        item.classList.add('alfabetoDesorganizado-letra')
        coluna.appendChild(item);
        letrasDesorganizada.appendChild(coluna);
    });

    const resultado = document.getElementById('resposta');
    const ordemEsperada = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    new Sortable(letrasDesorganizada, {
        animation: 150,
        onEnd : function() {
            const elemetos = letrasDesorganizada.querySelectorAll('.letra');
            const ordemAtual = Array.from(elemetos).map(elemento => elemento.textContent);

            const verificaordem = ordemAtual.every((valor, index) => valor === ordemEsperada[index]);

            if(verificaordem){
                resultado.textContent = 'Ordem correta!';
                resultado.style.color = 'green';
                tocarAcertoOuErro("acerto");

                setTimeout(() => {
                        mostrarModalParabens();
                }, 1500);

            }else{
                resultado.textContent = '';
            }
        }
    });
});

// tocar som de acerto ou erro
function tocarAcertoOuErro(tipo, callback){
    let som;

    if(tipo === 'acerto'){
        som = '/static/sound/acerto.mp3';
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

const mostrarModalParabens = () => {
    const modal = document.createElement('div');
    modal.classList.add('modal-fim');

    const conteudo = document.createElement('div');
    conteudo.classList.add('conteudo-modal');

    const titulo = document.createElement('h2');
    titulo.textContent = '🎉 Parabéns!';

    const texto = document.createElement('p');
    texto.textContent = 'Você acertou a ordem!';

    const botao = document.createElement('button');
    botao.textContent = 'Continuar';

    //variável que recebe a url do django para ser redirecionado para a página
    const voltarTrilha = document.getElementById('trilha3').dataset.url;
    botao.addEventListener('click', () => {
        modal.remove();
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
