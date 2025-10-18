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


  // Função para obter o CSRF token do cookie
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
});
