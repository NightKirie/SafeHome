from django.db import models

# Create your models here.


class Case(models.Model):
    name = models.CharField(max_length=16)
    userID = models.CharField(max_length=50)
    phone = models.CharField(max_length=10)
    email = models.CharField(max_length=50)
    addressCounty = models.CharField(max_length=5)
    addressDistrict = models.CharField(max_length=5)
    addressRoad = models.CharField(max_length=10)
    addressLane = models.CharField(max_length=5)
    addressAlley = models.CharField(max_length=5)
    addressNumber = models.CharField(max_length=5)
    addressFloor = models.CharField(max_length=5)
    addressRoom = models.CharField(max_length=5)
    relation = models.CharField(max_length=5)
    status = models.CharField(max_length=10)
    assign = models.CharField(max_length=10)
    volunteer = models.CharField(max_length=16)
    checked = models.CharField(max_length=5)

    def __str__(self):
        response = ""
        title = []
        title.append(self.addressCounty)
        title.append(self.addressDistrict)
        title.append(self.addressRoad)
        title.append(self.addressLane)
        title.append(self.addressAlley)
        title.append(self.addressNumber)
        title.append(self.addressFloor)
        title.append(self.addressRoom)

        for t in title:
            if(t != "none"):
                response = response + t

        return self.addressCounty
