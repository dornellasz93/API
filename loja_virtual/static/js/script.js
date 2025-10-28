document.addEventListener('DOMContentLoaded', () => {

    // --- Configuração base ---
    const API_URL = 'http://127.0.0.1:8000';
    
    // --- Pega os elementos do HTML ---
    const loginForm = document.getElementById('login-form');
    const loadButton = document.getElementById('load-produtos-btn');
    const productListEl = document.getElementById('lista-produtos');

    if (!loginForm || !loadButton || !productListEl) {
        console.error("Erro: Não foi possível encontrar um dos elementos essenciais (formulário, botão ou lista).");
        return;
    }

    // --- LOGIN NA API ---
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            const response = await fetch(`${API_URL}/api-token-auth/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) throw new Error('Usuário ou senha inválidos');

            const data = await response.json();
            localStorage.setItem('apiToken', data.token);

            alert('✅ Login realizado com sucesso!');
        } catch (error) {
            console.error('Erro no login:', error);
            alert(error.message);
        }
    });

    // --- CARREGAR PRODUTOS DA API ---
    loadButton.addEventListener('click', async () => {
        const token = localStorage.getItem('apiToken');

        if (!token) {
            alert('⚠️ Faça login antes de carregar os produtos.');
            return;
        }

        productListEl.innerHTML = '<li>Carregando...</li>'; 

        try {
            const response = await fetch(`${API_URL}/api/jogos/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    alert('Token expirado. Faça login novamente.');
                    localStorage.removeItem('apiToken');
                }
                throw new Error('Falha ao buscar produtos');
            }

            const produtos = await response.json();
            productListEl.innerHTML = '';

            produtos.forEach(produto => {
                const item = document.createElement('li');
                const img = document.createElement('img');
                
                img.src = produto.imagem;
                img.alt = produto.titulo;

                const text = document.createElement('span');
                text.textContent = `${produto.titulo} - Gênero: ${produto.genero}`;

                item.appendChild(img);
                item.appendChild(text);

                productListEl.appendChild(item);
            });

        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            productListEl.innerHTML = '<li>Erro ao carregar produtos.</li>';
        }
    });

});