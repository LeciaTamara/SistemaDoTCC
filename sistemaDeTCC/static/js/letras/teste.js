document.addEventListener('DOMContentLoaded', () => {
  const letrasBastao = [
    'A','B','C','D','E','F','G','H','I','J',
    'K','L','M','N','O','P','Q','R','S','T',
    'U','V','W','X','Y','Z'
  ];

  const alfabetoCompleto = document.getElementById('clicarNaLetra');

  letrasBastao.forEach(letra => {
    const coluna = document.createElement('div');
    coluna.className = 'col-2 mb-3';

    const botao = document.createElement('button');
    botao.type = 'button';
    botao.textContent = letra;
    botao.classList.add('botao-letra', `cor-${letra.toLowerCase()}`);

    botao.onclick = () => {
      clicarNaLetra(letra);
      aumentarLetraZoom(botao);
    };

    coluna.appendChild(botao);
    alfabetoCompleto.appendChild(coluna);
  });
});

function clicarNaLetra(palavra) {
  fetch('/api/geraVoz/GerarAudioAPIView/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken()
    },
    body: JSON.stringify({ palavra: palavra })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const som = new Howl({
      src: [data.som_url]
    });
    som.play();
  });
}

function getCSRFToken() {
  const valorCookie = document.cookie.split(';');
  for (let cookie of valorCookie) {
    const [nome, valor] = cookie.trim().split('=');
    if (nome === 'csrftoken') {
      return valor;
    }
  }
  return null;
}

function aumentarLetraZoom(botao) {
  botao.classList.add('zoom');
  setTimeout(() => {
    botao.classList.remove('zoom');
  }, 2000);
}
