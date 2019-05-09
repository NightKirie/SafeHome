from django.db import models

# Create your models here.


class Case(models.Model):
    name = models.CharField(max_length=16)
    userID = models.CharField(max_length=50)
    phone = models.CharField(max_length=10)
    email = models.CharField(max_length=50)
    addressCounty = models.CharField(max_length=5, blank=True, default='none')
    addressDistrict = models.CharField(max_length=5, blank=True, default='none')
    addressRoad = models.CharField(max_length=10, blank=True, default='none')
    addressLane = models.CharField(max_length=5, blank=True, default='none')
    addressAlley = models.CharField(max_length=5, blank=True, default='none')
    addressNumber = models.CharField(max_length=5, blank=True, default='none')
    addressFloor = models.CharField(max_length=5, blank=True, default='none')
    addressRoom = models.CharField(max_length=5, blank=True, default='none')
    relation = models.CharField(max_length=5)
    status = models.CharField(max_length=10)
    assign = models.CharField(max_length=10)
    volunteer = models.CharField(max_length=16)
    checked = models.CharField(max_length=5)

    def __str__(self):
        return self.name
