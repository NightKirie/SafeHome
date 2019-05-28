from django.db import models

# Create your models here.


class Case(models.Model):
    SN = models.CharField(max_length=12, default='000000000000')
    name = models.CharField(max_length=16)
    lineID = models.CharField(max_length=100)
    username = models.CharField(max_length=50)
    phone = models.CharField(max_length=10)
    relation = models.CharField(max_length=5)
    wishDate = models.CharField(max_length=10)
    address = models.CharField(max_length=100)
    addressCounty = models.CharField(max_length=5)
    addressDistrict = models.CharField(max_length=5)
    addressRoad = models.CharField(max_length=10)
    addressSection = models.CharField(max_length=2)
    addressLane = models.CharField(max_length=5)
    addressAlley = models.CharField(max_length=5)
    addressNumber = models.CharField(max_length=5)
    addressNumberD = models.CharField(max_length=5)
    addressFloor = models.CharField(max_length=5)
    addressFloorD = models.CharField(max_length=5)
    addressRoom = models.CharField(max_length=5)
    buildingAge = models.CharField(max_length=3)
    buildingType = models.CharField(max_length=20)
    buildingFloors = models.CharField(max_length=3, default='1')
    buildingRemarks = models.CharField(max_length=100)
    assign = models.CharField(max_length=10)
    volunteer = models.CharField(max_length=16)
    checked = models.CharField(max_length=5)
    status = models.CharField(max_length=10)
    applyDate = models.CharField(max_length=60, default='undefined')

    def __str__(self):
        return self.address
