from django.db import models

class Jogo(models.Model):
    imagem = models.ImageField(upload_to='jogos_imagens/')
    titulo = models.CharField(max_length=100)
    genero = models.CharField(max_length=50)
    lancamento = models.DateField()
    descricao = models.TextField(blank=True)

    def __str__(self):
        return self.titulo
