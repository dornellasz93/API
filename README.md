Loja Virtual - API Django + Frontend Django
Este projeto demonstra a criação de uma arquitetura de software desacoplada (decoupled). Ele é composto por dois projetos Django independentes que rodam simultaneamente:

Backend (API - BGDornellas): Um servidor Django Rest Framework (DRF) que serve uma API para "Jogos". Ele gerencia os dados, os uploads de imagem e a autenticação.

Frontend (Cliente - loja_virtual): Um servidor Django simples cujo único propósito é servir uma página (HTML/CSS/JS). Esta página age como um cliente que consome a API do backend para fazer login e exibir os produtos.

🏛️ Arquitetura
1. Backend (API - BGDornellas)
Responsabilidade: Lógica de negócios, banco de dados e autenticação.

Framework: Django + Django Rest Framework.

Autenticação: TokenAuthentication (via rest_framework.authtoken).

Servidor: Roda em http://127.0.0.1:8000.

2. Frontend (Cliente - loja_virtual)
Responsabilidade: Interface do usuário (UI) e experiência do cliente.

Framework: Django (apenas para servir o template) + JavaScript puro (Vanilla JS).

Funcionalidade: Usa a Fetch API do JavaScript para se comunicar com o Backend, fazer login e buscar dados.

Servidor: Roda em http://127.0.0.1:8001.

✨ Funcionalidades
Login de usuário via API (/api-token-auth/).

Armazenamento do Token de autenticação no localStorage do navegador.

Listagem dinâmica de produtos (jogos) consumindo a API (/api/jogos/).

Exibição das imagens, títulos e gêneros dos produtos.

Comunicação Cross-Origin (CORS) configurada no backend para permitir requisições do frontend.

📋 Pré-requisitos
Python (3.8+)

Pip (Gerenciador de pacotes do Python)

🚀 Instalação e Configuração
IMPORTANTE: Você precisará de dois terminais abertos para rodar este projeto, um para cada servidor.

1. Backend (API - BGDornellas - Porta 8000)
Este é o servidor que armazena os dados.

Navegue até a pasta do backend:

Bash

cd /caminho/para/BGDornellas
Crie e ative um ambiente virtual (venv):

Bash

python -m venv venv
# No Windows:
.\venv\Scripts\activate
# No macOS/Linux:
source venv/bin/activate
Instale as dependências:

Bash

pip install django djangorestframework django-cors-headers pillow
(pillow é necessário para o ImageField dos seus produtos)

Configure o settings.py (API):

Verifique se rest_framework, rest_framework.authtoken e corsheaders estão em INSTALLED_APPS.

Verifique se corsheaders.middleware.CorsMiddleware está no topo de MIDDLEWARE.

Adicione a origem do seu frontend:

Python

CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:8001",
    "http://localhost:8001",
]
Configure MEDIA_URL = '/media/' e MEDIA_ROOT = BASE_DIR / 'media'.

Configure o urls.py (API principal):

Adicione o path('api-token-auth/', ...) para o login.

Adicione a configuração de arquivos estáticos e de mídia (para DEBUG=True):

Python

from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
Crie o banco de dados e as tabelas:

Bash

py manage.py migrate
Crie um usuário para fazer login na API:

Bash

py manage.py createsuperuser
(Anote este usuário e senha, você usará no formulário da loja)

2. Frontend (Cliente - loja_virtual - Porta 8001)
Este servidor apenas mostra a página HTML.

Abra um novo terminal e navegue até a pasta do frontend:

Bash

cd /caminho/para/loja_virtual
Crie e ative um ambiente virtual:

Bash

python -m venv venv
# No Windows:
.\venv\Scripts\activate
# No macOS/Linux:
source venv/bin/activate
Instale o Django (apenas para servir o HTML):

Bash

pip install django
(Não é necessário rodar migrate ou createsuperuser aqui)

Verifique o script.js:

Confirme se a variável API_URL está correta:

JavaScript

const API_URL = 'http://127.0.0.1:8000';
🏃‍♂️ Rodando o Projeto
Você precisa iniciar os dois servidores simultaneamente.

No Terminal 1 (Backend API):

Bash

cd /caminho/para/BGDornellas
.\venv\Scripts\activate
py manage.py runserver 8000
(Deixe este terminal rodando)

No Terminal 2 (Frontend Cliente):

Bash

cd /caminho/para/loja_virtual
.\venv\Scripts\activate
py manage.py runserver 8001
(Deixe este terminal rodando)

Pronto! Agora acesse http://127.0.0.1:8001/ (ou a URL do seu app produtos) no seu navegador para ver a loja virtual em ação.

📡 Endpoints da API (Backend - porta 8000)
POST /api-token-auth/

Ação: Login.

Body: { "username": "seu_usuario", "password": "sua_senha" }

Resposta: { "token": "seu_token_de_api" }

GET /api/jogos/

Ação: Lista todos os jogos.

Header (Obrigatório): Authorization: Token seu_token_de_api

Resposta: [ { "titulo": "...", "genero": "...", "imagem": "http://.../media/..." }, ... ]
