from django.db import models

# Create your models here.


class CaseFiles(models.Model):
    name = models.CharField(max_length=16)
    path = models.FileField(default='null')

    def __str__(self):
        return self.name
