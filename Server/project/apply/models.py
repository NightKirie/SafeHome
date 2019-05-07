from django.db import models

# Create your models here.


class Case(models.Model):
    name = models.CharField(max_length=16)
    userID = models.CharField(max_length=50)
    phone = models.CharField(max_length=10)
    email = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    relation = models.CharField(max_length=5)
    status = models.CharField(max_length=10)
    assign = models.CharField(max_length=10)
    volunteer = models.CharField(max_length=16)
    checked = models.CharField(max_length=5)

    def __str__(self):
        return self.address