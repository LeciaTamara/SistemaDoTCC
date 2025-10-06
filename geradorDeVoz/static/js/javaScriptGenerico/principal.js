document.addEventListener("DOMContentLoaded", function () {
  let vozesDisponiveis = [];

  function carregarVozes() {
    vozesDisponiveis = speechSynthesis.getVoices();
  }

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = carregarVozes;
  }

  carregarVozes();

  document.querySelectorAll('.reproduzir').forEach(botao => {
    botao.addEventListener('click', () => {
      const texto = botao.dataset.texto?.trim();

      if (!texto) return;

      speechSynthesis.cancel();

      const fala = new SpeechSynthesisUtterance(texto);
      fala.lang = "pt-BR";

      const vozPortugues = vozesDisponiveis.find(voz => voz.lang === "pt-BR");
      if (vozPortugues) fala.voice = vozPortugues;

      speechSynthesis.speak(fala);
    });
  });
});
