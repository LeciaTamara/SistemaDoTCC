
document.addEventListener('DOMContentLoaded', () => {
  const alfabetoCompleto = [
    'A','B','C','D','E','F','G','H','I','J','K',
    'L','M','N','O','P','Q','R','S','T','U','V',
    'W','X','Y','Z'
  ];
  const alfabeto = document.getElementById("alfabeto");

  // cria uma letra de cada
  for (let letra of alfabetoCompleto){
    const div = document.createElement("div");
    div.className = "letra";
    div.textContent = letra;
    alfabeto.appendChild(div);
  }

  inicializarArrastar();
});

function inicializarArrastar(){
  // arrasta as letras originais do card
  interact('.letra').draggable({
    inertia: true,
    autoScroll: false,
    listeners: {
      move(event){
        const letra = event.target;
        const x = (parseFloat(letra.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(letra.getAttribute('data-y')) || 0) + event.dy;
        letra.style.transform = `translate(${x}px, ${y}px)`;
        letra.setAttribute('data-x', x);
        letra.setAttribute('data-y', y);
      },
      end(event){
        // sempre reseta a letra original no card
        const original = event.target;
        original.style.transform = 'translate(0px,0px)';
        original.removeAttribute('data-x');
        original.removeAttribute('data-y');
      }
    }
  });

  // dropzones das caixinhas
  interact('.espaco').dropzone({
    accept: '.letra',
    overlap: 0.75,
    ondrop(event){
      const letraOriginal = event.relatedTarget;
      const espaco = event.target;

      if (espaco.children.length === 0) {
        // cria um clone da letra original
        const clone = letraOriginal.cloneNode(true);
        clone.style.transform = 'translate(0px,0px)';
        clone.removeAttribute('data-x');
        clone.removeAttribute('data-y');
        espaco.appendChild(clone);
      }
    }
  });
}

// verificar palavra
function verificarPalavra() {
  const letras = document.querySelectorAll("#letras .espaco");
  const palavra = Array.from(letras)
    .map(e => e.firstChild ? e.firstChild.textContent : "")
    .join("");

  if (palavra === "MAISA") {
    letras.forEach(e => e.classList.add("correto"));
    tocarAcertoOuErro("acerto");
    
    setTimeout(() => {
      mostrarModalParabens();
    }, 1500);
    
  } else {
    letras.forEach(e => e.classList.add("errado", "alfabetoErrado"));
    tocarAcertoOuErro("erro");

    setTimeout(() => {
      letras.forEach(e => {
        const letraInserida = e.querySelector('.letra');
        if (letraInserida) {
          letraInserida.remove();
          letras.forEach(e => e.classList.remove("errado", "alfabetoErrado"));
        }
      });
    }, 2000);
  }
}

// clique para remover letra da caixinha
document.addEventListener('click', (event) =>{
  const letra = event.target.closest('.espaco .letra');
  if(letra){
    letra.remove(); // remove apenas o clone da caixinha
  }
});

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

const mostrarModalParabens = () => {
    const modal = document.createElement('div');
    modal.classList.add('modal-fim');

    const conteudo = document.createElement('div');
    conteudo.classList.add('conteudo-modal');

    const titulo = document.createElement('h2');
    titulo.textContent = '🎉 Parabéns!';

    const texto = document.createElement('p');
    texto.textContent = 'Você passou para a próxima fase!';

    const botao = document.createElement('button');
    botao.textContent = 'Continuar';

    //variável que recebe a url do django para ser redirecionado para a página
    const voltarTrilha = document.getElementById('trilha').dataset.url;
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
    }, 500); // pequeno delay para garantir que a animação seja aplicada
};