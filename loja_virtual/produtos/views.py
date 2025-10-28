import requests
from django.shortcuts import render


def loja_view(request):
    return render(request, 'produtos/lista_jogos.html')
