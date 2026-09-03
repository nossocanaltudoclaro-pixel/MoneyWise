// MoneyWise - Gerador de Piadas
// Usando a API JokeAPI: https://jokeapi.dev/

const jokeText = document.getElementById('jokeText');
const jokeType = document.getElementById('jokeType');
const jokeBtn = document.getElementById('jokeBtn');
const copyBtn = document.getElementById('copyBtn');
const loader = document.getElementById('loader');

const JOKE_API_URL = 'https://jokeapi.dev/random/joke?type=single';

// Função para buscar uma piada aleatória
async function fetchJoke() {
    try {
        // Mostrar loader
        loader.style.display = 'block';
        jokeBtn.disabled = true;
        copyBtn.disabled = true;

        // Fazer requisição à API
        const response = await fetch(JOKE_API_URL);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar piada');
        }

        const data = await response.json();

        // Verificar se a resposta foi bem-sucedida
        if (data.error) {
            jokeText.textContent = 'Desculpe, não consegui buscar uma piada no momento.';
            jokeType.textContent = '';
        } else {
            // Exibir a piada
            jokeText.textContent = data.joke;
            jokeType.textContent = `Tipo: ${data.type === 'single' ? 'Piada única' : 'Piada longa'}`;
        }

        // Esconder loader
        loader.style.display = 'none';
        jokeBtn.disabled = false;
        copyBtn.disabled = false;

    } catch (error) {
        console.error('Erro:', error);
        jokeText.textContent = 'Erro ao buscar piada. Verifique sua conexão e tente novamente.';
        jokeType.textContent = '';
        
        loader.style.display = 'none';
        jokeBtn.disabled = false;
        copyBtn.disabled = false;
    }
}

// Função para copiar a piada
function copyJoke() {
    const text = jokeText.textContent;
    
    if (text && text !== 'Clique no botão para gerar uma piada aleatória!' && text !== 'Erro ao buscar piada. Verifique sua conexão e tente novamente.') {
        navigator.clipboard.writeText(text).then(() => {
            // Feedback visual
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓ Copiado!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            alert('Erro ao copiar para a área de transferência');
        });
    }
}

// Event Listeners
jokeBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', copyJoke);

// Carregar uma piada ao abrir a página
document.addEventListener('DOMContentLoaded', () => {
    console.log('MoneyWise Gerador de Piadas carregado com sucesso!');
});
