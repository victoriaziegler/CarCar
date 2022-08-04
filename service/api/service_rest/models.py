from django.db import models
# from django.db import models
# from django.urls import reverse

class AutomobileVO(models.Model):
    # color = models.CharField(max_length=50)
    # year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)

class Technician(models.Model):
    name = models.TextField()
    employee_number = models.SmallIntegerField(unique=True)

class ServiceAppointment(models.Model):
    vin = models.CharField(max_length=17, null=True)
    owner_name = models.CharField(max_length=66)
    # date_time = models.DateTimeField(null=True)
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    #the assigned technician's name,
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE,
    )
    reason = models.CharField(max_length=50)
    finished = models.BooleanField(default=False, null=True)
    vip = models.BooleanField(default=False, null=True)
    # automobile was purchased from the dealership so that the concierge can give that customer "VIP treatment".




# class Manufacturer(models.Model):
#     name = models.CharField(max_length=100, unique=True)

#     def get_api_url(self):
#         return reverse("api_manufacturer", kwargs={"pk": self.id})


# class VehicleModel(models.Model):
#     name = models.CharField(max_length=100)
#     picture_url = models.URLField()

#     manufacturer = models.ForeignKey(
#         Manufacturer,
#         related_name="models",
#         on_delete=models.CASCADE,
#     )

#     def get_api_url(self):
#         return reverse("api_vehicle_model", kwargs={"pk": self.id})


# class Automobile(models.Model):
#     color = models.CharField(max_length=50)
#     year = models.PositiveSmallIntegerField()
#     vin = models.CharField(max_length=17, unique=True)

#     model = models.ForeignKey(
#         VehicleModel,
#         related_name="automobiles",
#         on_delete=models.CASCADE,
#     )

#     def get_api_url(self):
#         return reverse("api_automobile", kwargs={"vin": self.vin})
# Create your models here.
