function gerarAudio() {
    const texto = document.getElementById("texto").value;
    if (!texto.trim()) return;

    const player = document.getElementById("player");
    player.src = "/geraVoz/audio/?texto=" + encodeURIComponent(texto);
    player.play();
}