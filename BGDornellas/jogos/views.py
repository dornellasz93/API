from rest_framework import viewsets
from .models import Jogo
from api.serializers import JogoSerializer


class JogoViewSet(viewsets.ModelViewSet):
    """
    Um ViewSet completo para listar, criar, editar e deletar jogos.
    """
    queryset = Jogo.objects.all()
    serializer_class = JogoSerializer
