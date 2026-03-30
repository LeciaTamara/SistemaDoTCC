const grid = document.querySelector('.grid');

const cartasFrente = [
  'casa', 
  'mesa', 
  'moto', 
  'panela', 
  'sofa', 
  'tomate',
  'casa_2', 
  'mesa_2', 
  'moto_2', 
  'panela_2', 
  'sofa_2', 
  'tomate_2'
];

let carta1 = '';
let carta2 = '';

const criarElemeto = (tag, nomeClasse) => {
  const elemeto = document.createElement('div');
  elemeto.className = nomeClasse;
  return elemeto;
};

const criarCard = (cartasFrente) => {
  const card = criarElemeto('div', 'card');
  const front = criarElemeto('div', 'frente front');
  const verso = criarElemeto('div', 'frente verso');

  front.style.backgroundImage = `url('/static/image/silabasSimples/${cartasFrente}.png')`;

  card.appendChild(front);
  card.appendChild(verso);
  card.setAttribute('data-cartasFrente', cartasFrente);
  card.addEventListener('click', revelarCard);

  return card;
};

const carregarCartas = () => {
  const embaralharCartas = cartasFrente.sort(() => Math.random() - 0.5);
  let i = 0;
  const fragment = document.createDocumentFragment();

  const criarProximaCarta = () => {
    if (i < embaralharCartas.length) {
      const carta = criarCard(embaralharCartas[i]);
      fragment.appendChild(carta);
      i++;
      requestIdleCallback(criarProximaCarta);
    } else {
      grid.appendChild(fragment);
    }
  };

  criarProximaCarta();
};

const revelarCard = ({ target }) => {
  const carta = target.parentNode;

  if (carta.classList.contains('revelaCard') || carta.classList.contains('desabilitarCard')) return;

  const nomeCarta = carta.getAttribute('data-cartasFrente');

  if (carta1 === '') {
    carta.classList.add('revelaCard');
    pegarNomeCarta(nomeCarta);
    carta1 = carta;
  } else if (carta2 === '') {
    carta.classList.add('revelaCard');
    carta2 = carta;
    setTimeout(vefiricarCartas, 0);
  }
};

const vefiricarCartas = () => {
  let primeiraCarta = carta1.getAttribute('data-cartasFrente').replace(/[_\d]/g, '');
  let segundaCarta = carta2.getAttribute('data-cartasFrente').replace(/[_\d]/g, '');

  if (primeiraCarta === segundaCarta) {
    carta1.classList.add('desabilitarCard');
    carta2.classList.add('desabilitarCard');

    requestIdleCallback(() => {
      tocarAcertoOuErro('acerto', () => {
        clicarNaCarta(primeiraCarta, verificarFimDeJogo);
      });
    });

    carta1 = '';
    carta2 = '';
  } else {
    tocarAcertoOuErro('erro');
    setTimeout(() => {
      carta1.classList.remove('revelaCard');
      carta2.classList.remove('revelaCard');
      carta1 = '';
      carta2 = '';
    }, 600);
  }
};

const verificarFimDeJogo = () => {
  const cartaDesativada = document.querySelectorAll('.card.desabilitarCard');
  if (cartaDesativada.length === 12) {
    setTimeout(mostrarModalParabens, 1500);
  }
};

function tocarAcertoOuErro(tipo, callback) {
  let som = tipo === 'acerto' ? '/static/sound/acerto.mp3' : '/static/sound/erro.mp3';

  const tocarSom = new Howl({
    src: [som],
    onload: () => requestIdleCallback(() => tocarSom.play()),
    onend: () => {
      if (callback) callback();
    }
  });
}

function mostrarModalParabens() {
  const modal = document.createElement('div');
  modal.classList.add('modal-fim');

  const conteudo = document.createElement('div');
  conteudo.classList.add('conteudo-modal');

  const titulo = document.createElement('h2');
  titulo.textContent = '🎉 Parabéns!';

  const texto = document.createElement('p');
  texto.textContent = 'Você passou para a próxima fase!';

  const voltarTrilha = document.getElementById('trilha').dataset.url;

  const botao = document.createElement('button');
  botao.textContent = 'Continuar';
  botao.addEventListener('click', () => {
    modal.remove();
    window.location.href = voltarTrilha;
  });

  conteudo.appendChild(titulo);
  conteudo.appendChild(texto);
  conteudo.appendChild(botao);
  modal.appendChild(conteudo);
  document.body.appendChild(modal);

  setTimeout(() => {
    modal.classList.add('ativo');
  }, 50);
}

function clicarNaCarta(palavra, callback) {
  fetch('/GerarAudioAPIView/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken()
    },
    body: JSON.stringify({ palavra })
  })
    .then(response => {
      if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
      return response.json();
    })
    .then(data => {
      const som = new Howl({
        src: [data.som_url],
        onend: () => {
          if (callback) callback();
        }
      });
      requestIdleCallback(() => som.play());
    });
}

function getCSRFToken() {
  const valorCookie = document.cookie.split(';');
  for (let cookie of valorCookie) {
    const [nome, valor] = cookie.trim().split('=');
    if (nome === 'csrftoken') return valor;
  }
  return null;
}

const pegarNomeCarta = (nomeCarta) => {
  let pegaCarta = nomeCarta.includes('_2')
    ? nomeCarta.replace(/_2$/, '')
    : nomeCarta.slice(0, 2);

  clicarNaCarta(pegaCarta);
};

carregarCartas();
