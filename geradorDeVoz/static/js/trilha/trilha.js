document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.reproduzir').forEach(botao => {
    if (botao.offsetParent !== null) { // só adiciona se estiver visível
      botao.addEventListener('click', () => {
        const texto = botao.dataset.texto?.trim();
        if (!texto) return;

        fetch('/GerarAudioAPIView/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
          },
          body: JSON.stringify({ palavra: texto })
        })
        .then(response => response.json())
        .then(data => {
          if (data.som_url) {
            const audio = new Audio(data.som_url);
            audio.play().catch(err => {
              console.error("Erro ao reproduzir áudio:", err);
            });
          } else {
            console.error('Erro ao obter áudio:', data.erro);
          }
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
      });
    }
  });


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

function reproduzirSom(id) {
  const elemento = document.getElementById(id);
  const texto = elemento?.dataset?.texto?.trim() || elemento?.textContent?.trim();

  if (!texto) return;

  fetch('/GerarAudioAPIView/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: JSON.stringify({ palavra: texto })
  })
  .then(response => response.json())
  .then(data => {
    if (data.som_url) {
      const audio = new Audio(data.som_url);
      audio.play().catch(err => {
        console.error("Erro ao reproduzir áudio:", err);
      });
    } else {
      console.error('Erro ao obter áudio:', data.erro);
    }
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }


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