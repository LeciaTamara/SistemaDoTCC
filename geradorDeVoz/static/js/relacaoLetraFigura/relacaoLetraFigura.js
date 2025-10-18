const letras = [
    {letra: 'A', imagens: ['alface.webp', 'bone.webp', 'armario.webp', 'balde.webp', 'relogio.webp', 'feijao.webp', 'onibus.webp', 'radio.webp' ], correta: ['alface.webp', 'armario.webp']},
    {letra: 'B', imagens: ['bone.webp', 'pizza.webp', 'ventilador.webp', 'chave.webp', 'mel.webp', 'guardaChuva.webp', 'balde.webp', 'queijo.webp'], correta: ['bone.webp', 'balde.webp']},
    {letra: 'C', imagens: ['chave.webp', 'escada.webp', 'bicicleta.webp', 'mesa.webp', 'bolsa.webp', 'guardaRoupa.webp', 'cama.webp', 'facebook.webp'], correta: ['chave.webp', 'cama.webp']},
    {letra: 'D', imagens: ['dado.webp', 'dentista.webp', 'caixa.webp', 'sacola.webp', 'peixe.webp', 'anel.webp', 'igreja.webp', 'geladeira.webp'], correta: ['dado.webp', 'dentista.webp']},
    {letra: 'E', imagens: ['espelho.webp', 'escada.webp', 'relogio.webp', 'queijo.webp', 'fogao.webp', 'moeda.webp', 'vaso.webp', 'pia.webp'], correta: ['espelho.webp', 'escada.webp']},
    {letra: 'F', imagens: ['geladeira.webp', 'garfo.webp', 'fogao.webp', 'forma.webp', 'relogio.webp', 'espelho.webp', 'porta.webp', 'facebook.webp'], correta: ['fogao.webp', 'forma.webp', 'facebook.webp']},
    {letra: 'G', imagens: ['geladeira.webp', 'garfo.webp', 'sabao.webp', 'martelo.webp', 'forma.webp', 'liquidificador.webp', 'caneta.webp', 'bone.webp'], correta: ['geladeira.webp', 'garfo.webp']},
    {letra: 'I', imagens: ['igreja.webp', 'pizza.webp', 'ventilador.webp', 'chave.webp', 'mel.webp', 'guardaChuva.webp', 'balde.webp', 'isqueiro.webp'], correta: ['igreja.webp', 'isqueiro.webp']},
    {letra: 'J', imagens: ['mel.webp', 'jarra.webp', 'bicicleta.webp', 'mesa.webp', 'armario.webp', 'guardaRoupa.webp', 'cama.webp', 'bolsa.webp'], correta: ['jarra.webp']},
    {letra: 'L', imagens: ['lampada.webp', 'liquidificador.webp', 'caixa.webp', 'sacola.webp', 'peixe.webp', 'anel.webp', 'igreja.webp', 'geladeira.webp'], correta: ['lampada.webp', 'liquidificador.webp']},
    {letra: 'M', imagens: ['mesa.webp', 'escada.webp', 'relogio.webp', 'queijo.webp', 'fogao.webp', 'moeda.webp', 'vaso.webp', 'mel.webp'], correta: ['mesa.webp', 'moeda.webp', 'mel.webp']},
    {letra: 'N', imagens: ['espelho.webp', 'nuvem.webp', 'fogao.webp', 'forma.webp', 'relogio.webp', 'caneta.webp', 'porta.webp', 'facebook.webp'], correta: ['nuvem.webp']},
    {letra: 'O', imagens: ['ovo.webp', 'garfo.webp', 'sabao.webp', 'martelo.webp', 'onibus.webp', 'liquidificador.webp', 'caneta.webp', 'anel.webp'], correta: ['ovo.webp', 'onibus.webp']},
    {letra: 'P', imagens: ['panela.webp', 'pizza.webp', 'ventilador.webp', 'chave.webp', 'mel.webp', 'guardaChuva.webp', 'balde.webp', 'isqueiro.webp'], correta: ['panela.webp', 'pizza.webp']},
    {letra: 'Q', imagens: ['mel.webp', 'jarra.webp', 'bicicleta.webp', 'mesa.webp', 'alface.webp', 'guardaRoupa.webp', 'cama.webp', 'queijo.webp'], correta: ['queijo.webp']},
    {letra: 'R', imagens: ['radio.webp', 'liquidificador.webp', 'caixa.webp', 'sacola.webp', 'peixe.webp', 'anel.webp', 'igreja.webp', 'guardaRoupa.webp'], correta: ['radio.webp']},
    {letra: 'S', imagens: ['mesa.webp', 'escada.webp', 'relogio.webp', 'sabao.webp', 'fogao.webp', 'moeda.webp', 'vaso.webp', 'sacola.webp'], correta: ['sabao.webp', 'sacola.webp']},
    {letra: 'T', imagens: ['tesoura.webp', 'nuvem.webp', 'martelo.webp', 'forma.webp', 'relogio.webp', 'espelho.webp', 'porta.webp', 'facebook.webp'], correta: ['tesoura.webp']},
    {letra: 'U', imagens: ['uva.webp', 'ovo.webp', 'sabao.webp', 'martelo.webp', 'onibus.webp', 'liquidificador.webp', 'caneta.webp', 'anel.webp'], correta: ['uva.webp']},
    {letra: 'V', imagens: ['panela.webp', 'pizza.webp', 'ventilador.webp', 'chave.webp', 'mel.webp', 'guardaChuva.webp', 'vestido.webp', 'isqueiro.webp'], correta: ['ventilador.webp', 'vestido.webp']},
    {letra: 'W', imagens: ['mel.webp', 'jarra.webp', 'bicicleta.webp', 'mesa.webp', 'whatsapp.webp', 'guardaRoupa.webp', 'cama.webp', 'queijo.webp'], correta: ['whatsapp.webp']},
    {letra: 'X', imagens: ['radio.webp', 'liquidificador.webp', 'caixa.webp', 'sacola.webp', 'peixe.webp', 'caneta.webp', 'igreja.webp', 'xicara.webp'], correta: ['xicara.webp']},
    {letra: 'Z', imagens: ['zebra.webp', 'nuvem.webp', 'martelo.webp', 'relogio.webp', 'espelho.webp', 'porta.webp', 'facebook.webp'], correta: ['zebra.webp']}
]

//Carrega as imagens em cache antes de serem exibidas no navegador
const imagensParaPrecarregar = new Set();
letras.forEach(item => item.imagens.forEach(img => imagensParaPrecarregar.add(img)));

imagensParaPrecarregar.forEach(nome => {
  const img = new Image();
  img.src = `/static/image/relacaoLetraFigura/${nome}`;
});


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
        const nomeImagem = nomeDaImagemAdaptada[figura.replace('.webp', '')] || figura.replace('.webp', '');  //o replace serve para remover o nomr .webp, deixando só o nome para ser enviado
        imagem.onclick = () => {
            emitirSomDaImagem(nomeImagem, () => {
                verificarResposta(figura);
            });
        };
        espacoImagem.appendChild(imagem);
    });
}

function emitirSomDaImagem(palavra, callback){
    fetch('/GerarAudioAPIView/', {
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
