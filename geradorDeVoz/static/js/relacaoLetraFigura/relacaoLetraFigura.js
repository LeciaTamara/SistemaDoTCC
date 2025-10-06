const letras = [
    {letra: 'A', imagens: ['alface.png', 'bone.png', 'armario.png', 'balde.png', 'relogio.png', 'feijao.png', 'onibus.png', 'radio.png' ], correta: ['alface.png', 'armario.png']},
    {letra: 'B', imagens: ['bone.png', 'pizza.png', 'ventilador.png', 'chave.png', 'mel.png', 'guardaChuva.png', 'balde.png', 'queijo.png'], correta: ['bone.png', 'balde.png']},
    {letra: 'C', imagens: ['chave.png', 'escada.png', 'bicicleta.png', 'mesa.png', 'bolsa.png', 'guardaRoupa.png', 'cama.png', 'facebook.png'], correta: ['chave.png', 'cama.png']},
    {letra: 'D', imagens: ['dado.png', 'dentista.png', 'caixa.png', 'sacola.png', 'peixe.png', 'anel.png', 'igreja.png', 'geladeira.png'], correta: ['dado.png', 'dentista.png']},
    {letra: 'E', imagens: ['espelho.png', 'escada.png', 'relogio.png', 'queijo.png', 'fogao.png', 'moeda.png', 'vaso.png', 'pia.png'], correta: ['espelho.png', 'escada.png']},
    {letra: 'F', imagens: ['geladeira.png', 'garfo.png', 'fogao.png', 'forma.png', 'relogio.png', 'espelho.png', 'porta.png', 'facebook.png'], correta: ['fogao.png', 'forma.png', 'facebook.png']},
    {letra: 'G', imagens: ['geladeira.png', 'garfo.png', 'sabao.png', 'martelo.png', 'forma.png', 'liquidificador.png', 'caneta.png', 'bone.png'], correta: ['geladeira.png', 'garfo.png']},
    {letra: 'I', imagens: ['igreja.png', 'pizza.png', 'ventilador.png', 'chave.png', 'mel.png', 'guardaChuva.png', 'balde.png', 'isqueiro.png'], correta: ['igreja.png', 'isqueiro.png']},
    {letra: 'J', imagens: ['mel.png', 'jarra.png', 'bicicleta.png', 'mesa.png', 'armario.png', 'guardaRoupa.png', 'cama.png', 'bolsa.png'], correta: ['jarra.png']},
    {letra: 'L', imagens: ['lampada.png', 'liquidificador.png', 'caixa.png', 'sacola.png', 'peixe.png', 'anel.png', 'igreja.png', 'geladeira.png'], correta: ['lampada.png', 'liquidificador.png']},
    {letra: 'M', imagens: ['mesa.png', 'escada.png', 'relogio.png', 'queijo.png', 'fogao.png', 'moeda.png', 'vaso.png', 'mel.png'], correta: ['mesa.png', 'moeda.png', 'mel.png']},
    {letra: 'N', imagens: ['espelho.png', 'nuvem.png', 'fogao.png', 'forma.png', 'relogio.png', 'caneta.png', 'porta.png', 'facebook.png'], correta: ['nuvem.png']},
    {letra: 'O', imagens: ['ovo.png', 'garfo.png', 'sabao.png', 'martelo.png', 'onibus.png', 'liquidificador.png', 'caneta.png', 'anel.png'], correta: ['ovo.png', 'onibus.png']},
    {letra: 'P', imagens: ['panela.png', 'pizza.png', 'ventilador.png', 'chave.png', 'mel.png', 'guardaChuva.png', 'balde.png', 'isqueiro.png'], correta: ['panela.png', 'pizza.png']},
    {letra: 'Q', imagens: ['mel.png', 'jarra.png', 'bicicleta.png', 'mesa.png', 'alface.png', 'guardaRoupa.png', 'cama.png', 'queijo.png'], correta: ['queijo.png']},
    {letra: 'R', imagens: ['radio.png', 'liquidificador.png', 'caixa.png', 'sacola.png', 'peixe.png', 'anel.png', 'igreja.png', 'guardaRoupa.png'], correta: ['radio.png']},
    {letra: 'S', imagens: ['mesa.png', 'escada.png', 'relogio.png', 'sabao.png', 'fogao.png', 'moeda.png', 'vaso.png', 'sacola.png'], correta: ['sabao.png', 'sacola.png']},
    {letra: 'T', imagens: ['tesoura.png', 'nuvem.png', 'martelo.png', 'forma.png', 'relogio.png', 'espelho.png', 'porta.png', 'facebook.png'], correta: ['tesoura.png']},
    {letra: 'U', imagens: ['uva.png', 'ovo.png', 'sabao.png', 'martelo.png', 'onibus.png', 'liquidificador.png', 'caneta.png', 'anel.png'], correta: ['uva.png']},
    {letra: 'V', imagens: ['panela.png', 'pizza.png', 'ventilador.png', 'chave.png', 'mel.png', 'guardaChuva.png', 'vestido.png', 'isqueiro.png'], correta: ['ventilador.png', 'vestido.png']},
    {letra: 'W', imagens: ['mel.png', 'jarra.png', 'bicicleta.png', 'mesa.png', 'whatsapp.png', 'guardaRoupa.png', 'cama.png', 'queijo.png'], correta: ['whatsapp.png']},
    {letra: 'X', imagens: ['radio.png', 'liquidificador.png', 'caixa.png', 'sacola.png', 'peixe.png', 'caneta.png', 'igreja.png', 'xicara.png'], correta: ['xicara.png']},
    {letra: 'Z', imagens: ['zebra.png', 'nuvem.png', 'martelo.png', 'relogio.png', 'espelho.png', 'porta.png', 'facebook.png'], correta: ['zebra.png']}
]

const nomeDaImagemAdaptada = {
    radio: 'rahdiu',
    bone: 'boné',
    escada: 'hescada',
    forma: 'fôrmar'
}


let indiceLetra = 0;
//função para reproduzir o áudio do texto gerado dinâmicamente
document.addEventListener('DOMContentLoaded', () => {
  let vozesDisponiveis = [];

  //função que busca todas as vozes que estão disponíveis no navegador 
  function carregarVozes() {
    vozesDisponiveis = speechSynthesis.getVoices();
  }

  //verifica se o navegador suporta o evento onvoiceschabged que é chamando quando as vozes ficam disponíveis
  if (speechSynthesis.onvoiceschanged !== undefined) {
    //isso garante que carregar vozes só seja chamado a página html já estiver carregada
    speechSynthesis.onvoiceschanged = carregarVozes;
  }

  carregarVozes();

  document.querySelectorAll('.reproduzirId').forEach(botao => {
    botao.addEventListener('click', () => {
      const texto = document.getElementById('letraIndicada')?.textContent?.trim();

      if (!texto) return;

      //cancela a fala que está falando caso o usuário clique em outro botão para as falas não misturar
      speechSynthesis.cancel();

      //cria um novo objeto de fala com o texto que foi capturado
      const fala = new SpeechSynthesisUtterance(texto);
      fala.lang = "pt-BR";

      //busca uma vos que tenha o idioma pt-br entre as vozes disponíveis
      const vozPortugues = vozesDisponiveis.find(voz => voz.lang === "pt-BR");
      if (vozPortugues) fala.voice = vozPortugues;

      //inicia a reprodução do texto em voz
      speechSynthesis.speak(fala);
    });
  });

  mostrarLetraFigura(); // se essa função estiver definida
});


//função para mostrar a letra e as imagens
function mostrarLetraFigura() {
  const letraFigura = letras[indiceLetra];
  const texto = `Selecione a figura que começa com a letra: ${letraFigura.letra}`;

  // Atualiza o texto visível
  const letraIndicada = document.getElementById('letraIndicada');
  if (letraIndicada) {
    letraIndicada.textContent = texto;
  }

  // Atualiza o texto que será falado
  const botaoReproduzirSom = document.querySelector('.reproduzirId');
  if (botaoReproduzirSom) {
    botaoReproduzirSom.dataset.texto = texto;
  }

    const espacoImagem = document.getElementById('imagens');
    // limpa as imagens anteriores que estavam no espaço
    espacoImagem.innerHTML = '';

    const botaoAvancarDesafio1 = document.getElementById('avancarParaDesafio1');
    if (botaoAvancarDesafio1) {
        if(letraFigura.letra === 'Z'){
            botaoAvancarDesafio1.style.display = 'inline-block';
        }else{
            botaoAvancarDesafio1.style.display = 'none'
        }
    }
    

    //limpa o campo resposta
    document.getElementById('resposta').textContent = '';

    //embaralha as imagens de forma aleatória utilizando a biblioteca math random
    const imagensEmbaralhadas = [...letraFigura.imagens].sort(() => Math.random() - 0.5);

    imagensEmbaralhadas.forEach(figura => {
        const imagem = document.createElement('img');
        imagem.src = `/static/image/relacaoLetraFigura/${figura}`;
        imagem.alt = figura;
        imagem.className = 'imagemFigura';
        const nomeImagem = nomeDaImagemAdaptada[figura.replace('.png', '')] || figura.replace('.png', '');  //o replace serve para remover o nomr .png, deixando só o nome para ser enviado
        imagem.onclick = () => {
            emitirSomDaImagem(nomeImagem, () => {
                verificarResposta(figura);
            });
        };
        espacoImagem.appendChild(imagem);
    });
}

function emitirSomDaImagem(palavra, callback){
    fetch('/nuncaetardeparaaprender/GerarAudioAPIView/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({palavra:palavra})
    })
    .then(response => {
        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const som = new Howl({
            src: [data.som_url],
            //ativa a função callback onde a função verificar resposta só é chamada
            //quando o nome da figura for reproduzido completamente
            onend: () =>{
                if (callback) callback();
            }
        });
        som.play();
    })
    .catch(error => {
        console.error('Erro ao emitir som da figura:', error);
    });
}

function getCSRFToken(){
    const valorCookie = document.cookie.split(';');
    for (let cookie of valorCookie){
        const [nome, valor] = cookie.trim().split('=');
        if (nome === 'csrftoken') {
            return valor;
        }
    }
    return null
}

// função que verifica se é a figura correta
let imagemSelecionadaCorreta = [];

function verificarResposta(imagemClicada){
    const letraFigura = letras[indiceLetra];
    //pega a imagem que foi clicada para aplicar a borda
    const imagemAtual = [...document.querySelectorAll('img')].find(img => img.alt === imagemClicada);

    //emitir o som de certo se a imaggem clicada or considerada a correta
    if(letraFigura.correta.includes(imagemClicada)){
        if(imagemAtual){
            imagemAtual.classList.add('imagemAcerto');
        }
        tocarAcertoOuErro('acerto');

        //adiciona a imagem correta no array só se ela ainda não foi clicada
        if(!imagemSelecionadaCorreta.includes(imagemClicada)){
            imagemSelecionadaCorreta.push(imagemClicada);
        }

    }else {
        if(imagemAtual){
            imagemAtual.classList.add('imagemErro');
            
            setTimeout(() => {
                imagemAtual.classList.remove('imagemErro');
            }, 3000);
        }
        tocarAcertoOuErro('erro');
    }

    //pega o elemeto html que tem o id resposta
    const resposta = document.getElementById('resposta');
    //acessa o objeto da letra atual de acordo o ídice da letra dentro do array
    const letraImagem = letras[indiceLetra];

    const numeroImagemCorreta = letraImagem.correta.length;

    if(imagemSelecionadaCorreta.length === numeroImagemCorreta){
        //cria copias do array das imagens selecionadas e ordena
        const imagensSelecionadaOrdenada = [...imagemSelecionadaCorreta].sort();
        const imagensCorretaOrdenada = [...letraImagem.correta].sort();

        //converte os arrays para strings e faz uma compararção entre os dois arrays
        const acerto = JSON.stringify(imagensSelecionadaOrdenada) === JSON.stringify(imagensCorretaOrdenada);

        if(acerto){
            resposta.textContent = 'Correto';

            if(indiceLetra < letras.length - 1){
                indiceLetra++;
                setTimeout(() => {
                    imagemSelecionadaCorreta = [];
                    mostrarLetraFigura();
                }, 2000);
            }else{
                
            }
        }
    }
}

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

//espera o html terminar de carregar para carregar o javaScript
// window.onload = mostrarLetraFigura;
