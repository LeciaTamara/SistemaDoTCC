document.addEventListener('DOMContentLoaded', () => {
  const imagemPalavras = [
    { id: 'lapis', nome: 'lápis' },
    { id: 'relogio', nome: 'relógio' },
    { id: 'alicate', nome: 'alicate' },
    { id: 'medico', nome: 'médico' },
    { id: 'celular', nome: 'celular' },
    { id: 'moeda', nome: 'moeda' },
    { id: 'batom', nome: 'batom' },
    { id: 'calculadora', nome: 'calculadora' },
    { id: 'lampada', nome: 'lampada' },
    { id: 'martelo', nome: 'martelo' },
    { id: 'perfume', nome: 'perfume' },
    { id: 'geladeira', nome: 'geladeira' }
  ];

  const palavrasCorretas = {
    lapis: 'LAPIS',
    relogio: 'RELOGIO',
    alicate: 'ALICATE',
    medico: 'MEDICO',
    celular: 'CELULAR',
    moeda: 'MOEDA',
    batom: 'BATOM',
    calculadora: 'CALCULADORA',
    lampada: 'LAMPADA',
    martelo: 'MARTELO',
    perfume: 'PERFUME',
    geladeira: 'GELADEIRA'
  };

  // Distribui a carga de eventos nas imagens
  let i = 0;
  const distribuirEventosImagem = () => {
    if (i < imagemPalavras.length) {
      const foto = imagemPalavras[i];
      const imagem = document.getElementById(foto.id);
      if (imagem) {
        imagem.addEventListener('click', () => {
          requestIdleCallback(() => emitirSomDaImagem(foto.nome));
        });
      }
      i++;
      requestIdleCallback(distribuirEventosImagem);
    }
  };
  distribuirEventosImagem();

  // Distribui a carga de eventos nos inputs
  const ids = Object.keys(palavrasCorretas);
  let j = 0;
  const distribuirEventosInput = () => {
    if (j < ids.length) {
      const idImagem = ids[j];
      const input = document.getElementById(`input-${idImagem}`);
      if (input) {
        input.addEventListener('blur', () => {
          requestIdleCallback(() => {
            const valorDigitado = input.value.trim().toUpperCase();
            const palavraEsperada = palavrasCorretas[idImagem];

            if (valorDigitado === '') {
              input.style.borderColor = '';
              input.style.backgroundColor = '';
              return;
            }

            if (valorDigitado === palavraEsperada) {
              input.style.borderColor = 'green';
              input.style.backgroundColor = '#d4fcd4';
              tocarAcertoOuErro('acerto');
            } else {
              input.style.borderColor = 'red';
              input.style.backgroundColor = '#fcd4d4';
              tocarAcertoOuErro('erro');
            }
          });
        });
      }
      j++;
      requestIdleCallback(distribuirEventosInput);
    }
  };
  distribuirEventosInput();
});

//Emite som da imagem clicada
function emitirSomDaImagem(palavra) {
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
      requestIdleCallback(() => {
        const som = new Howl({ src: [data.som_url] });
        som.play();
      });
    })
    .catch(error => {
      console.error('Erro ao emitir som da figura:', error);
    });
}

//Recupera o token CSRF
function getCSRFToken() {
  const valorCookie = document.cookie.split(';');
  for (let cookie of valorCookie) {
    const [nome, valor] = cookie.trim().split('=');
    if (nome === 'csrftoken') return valor;
  }
  return null;
}

//Toca som de acerto ou erro
function tocarAcertoOuErro(tipo, callback) {
  const som = tipo === 'acerto' ? '/static/sound/acerto.mp3' : '/static/sound/erro.mp3';
  const tocarSom = new Howl({
    src: [som],
    onload: () => requestIdleCallback(() => tocarSom.play()),
    onend: () => {
      if (callback) callback();
    }
  });
}
