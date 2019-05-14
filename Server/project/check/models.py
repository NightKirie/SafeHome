from django.db import models

# Create your models here.


class CaseFiles(models.Model):
    SN = models.CharField(max_length=12, default='000000000000')
    name = models.CharField(max_length=16)
    path = models.CharField(max_length=255)

    def __str__(self):
        return self.name
