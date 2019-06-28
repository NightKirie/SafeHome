from django.db import models

# Create your models here.


class CaseFiles(models.Model):
    SN = models.CharField(max_length=12, default='000000000000')
    name = models.CharField(max_length=16)
    phone = models.CharField(max_length=10, default='undefined')
    address = models.CharField(max_length=100, default='undefined')
    volunteer = models.CharField(max_length=20, default='undefined')
    checkDate = models.CharField(max_length=60, default='undefined')
    buildingFloors = models.CharField(max_length=10, default='1')
    buildingDesignYear = models.CharField(max_length=10, default='undf')
    buildingHouseholdCount = models.CharField(max_length=10, default='undf')
    buildingStructure = models.CharField(max_length=20, default='undefined')
    path = models.CharField(max_length=255)
    jpegCount = models.IntegerField()
    pngCount = models.IntegerField()

    def __str__(self):
        return self.address
