from django.db import models

class Cadastro(models.Model):
    ni = models.CharField(max_length=15)
    nome = models.CharField(max_length=255)
    email = models.EmailField()
    cel = models.CharField(max_length=255)
    ocup = models.FloatField()


class Disciplinas(models.Model):
    disciplinas = models.CharField(max_length=255, unique=True)
    sigla = models.CharField(max_length=255)
    curso = models.TextField(blank=True, null=True)
    carga_horaria = models.PositiveIntegerField()
    semestre = models.PositiveIntegerField()
    professor_responsavel = models.CharField(max_length=255)

    def __str__(self):
        return self.nome
