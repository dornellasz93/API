from django.urls import path
from . import views

urlpatterns = [
    path('', views.loja_view, name='lista_jogos'),
]
