
function pegarId(id){
    const idTagHtml = document.getElementById(id);
    return idTagHtml ? idTagHtml.textContent.trim(): "";
}

function reproduzirSom(id) {
   const texto = pegarId(id);
   if (!texto){
    return;
   } 

   const fala = new SpeechSynthesisUtterance(texto);
   fala.lang = "pt-BR";

   const vozes = speechSynthesis.getVoices();
   const vozPortugues = vozes.find(voz => voz.lang === "pt-BR");
   if(vozPortugues){
    fala.voice = vozPortugues;
   }

   speechSynthesis.speak(fala);
}

document.querySelectorAll('.reproduzir').forEach(botao => {
  botao.addEventListener('click', () => {
    const texto = botao.dataset.texto;
    if (!texto) return;

    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";

    const vozes = speechSynthesis.getVoices();
    const vozPortugues = vozes.find(voz => voz.lang === "pt-BR");
    if (vozPortugues) {
      fala.voice = vozPortugues;
    }

    speechSynthesis.speak(fala);
  });
});

//reproduz o som que vem do data-texto
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.posicaoBotao').forEach(container => {
        const botao = container.querySelector('.reproduzir');
        const animacao = container.querySelector('.animacao');

        if (botao && animacao) {
            botao.addEventListener('click', () => {
                if (typeof animacao.stop === 'function') {
                    animacao.stop();
                }
                animacao.style.display = 'none';
            });
        }
    });
});

// animação da mão
document.addEventListener("DOMContentLoaded", function () {
    const largura = window.innerWidth;
    const telaPequena = largura <= 600;
    const telaMedia = largura > 600 && largura <= 1024;

    document.querySelectorAll('.posicaoBotao').forEach(el => {
        const lottie = el.querySelector('.animacao');

        let top, left, right;

        if (telaPequena) {
            top = el.dataset.topSm;
            left = el.dataset.leftSm;
            right = el.dataset.rightSm;
        } else if (telaMedia) {
            top = el.dataset.topMd;
            left = el.dataset.leftMd;
            right = el.dataset.rightMd;
        } else {
            top = el.dataset.top;
            left = el.dataset.left;
            right = el.dataset.right;
        }

        if (top) lottie.style.top = top;

        if (left) {
            lottie.style.left = left;
            lottie.style.right = 'auto';
            lottie.style.transform = 'translateX(-50%)';
        } else if (right) {
            lottie.style.right = right;
            lottie.style.left = 'auto';
            lottie.style.transform = 'translateX(50%)';
        }
    });
});




// setTimeout(() => {
//     const animacao = document.getElementById('animacaClique');
//     if (animacao) {
//         animacao.stop()
//     }
// }, 5000);