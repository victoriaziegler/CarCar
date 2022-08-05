from django.db import models

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

class Technician(models.Model):
    name = models.TextField()
    employee_number = models.SmallIntegerField(unique=True)

class ServiceAppointment(models.Model):
    vin = models.CharField(max_length=17, null=True, unique=False)
    owner_name = models.CharField(max_length=66)
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE,
    )
    reason = models.CharField(max_length=50)
    finished = models.BooleanField(default=False, null=True, blank=True)
    vip = models.BooleanField(default=False, null=True)
