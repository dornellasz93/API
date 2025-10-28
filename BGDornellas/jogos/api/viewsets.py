from rest_framework import viewsets
from jogos.api import serializers
from jogos import models


class JogoViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.JogoSerializer
    queryset = models.Jogo.objects.all()
