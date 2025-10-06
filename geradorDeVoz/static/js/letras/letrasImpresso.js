/* O document.addEvenListener espera até que a página html seja carregada para disparar o evento 
'DomContentLoaded' que executa a função que exibiros botões do alfabeto 
*/
document.addEventListener('DOMContentLoaded', () =>{
    const letrasImpressas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
         'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
         'u', 'v', 'w', 'x', 'y', 'z'];
         
    const alfabetoCompleto = document.getElementById('clicarNaLetra');

    letrasImpressas.forEach(letra => {
        const coluna = document.createElement('div');
        // Divide o container em duas colunas
        coluna.className = 'col-2 mb-3';

        const botao = document.createElement('button');
        botao.type = 'button';
        botao.textContent = letra;

        //Aplica o estilo que define as cores dos botões
        botao.classList.add('button-letra', `button-corAlfabetoImpresso`)

        botao.onclick = () => {
            clicarNaLetra(letra);
            // aumentarLetraZoom(botao);
        };

        coluna.appendChild(botao)
        alfabetoCompleto.appendChild(coluna);
    });
});

function clicarNaLetra(palavra ) {
    // O método fetch envia uma para a api do django que emite o som
    fetch('/nuncaetardeparaaprender/GerarAudioAPIView/',{
        method: 'POST',
        // Cabeçalhos da requisição para a API
        headers: {
            // Diz que os dados serão enviados no formato json
            'Content-Type': 'application/json',
            // envia o tokén que o django utiliza para a segurança da sua aplicação
            'X-CSRFToken': getCSRFToken()
        },

        // envia o corpo da requisição django
        // Json.stringify transforma o objeto em uma string do tipo JSON
        body: JSON.stringify({palavra  : palavra })
    })
    .then(response => {
        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // recebe os dados convertidos com a letra correspondente
        const som = new Howl({
            // cria um objeto de som utilizando a biblioteca Howler.js
            src: [data.som_url]
        });
        // toca o som da letra
        som.play();
    })
}

// Função para pegar o CSRF token os cookies do navegador
function getCSRFToken(){
                     // Acessa todos os cookies como uma string 
    const valorCookie = document.cookie.split(';')// separa os valores dos cookies em um array
    for(let cookie of valorCookie) {
        // procura o cookie que começa com o token indicado
        // extrai o valor do token depois da iguadade
        const[nome, valor] = cookie.trim().split('=');
        if(nome === 'csrftoken'){
            
            // return valor
            return valor;
        }
    }
    return null;
}

// function aumentarLetraZoom(botao){
//     botao.classList.add('zoom');
//     setTimeout(() => {
//         botao.classList.remove('zoom');
//     }, 2000);
// }