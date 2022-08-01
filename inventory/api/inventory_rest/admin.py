from django.contrib import admin
from .models import Manufacturer, VehicleModel, Automobile

class VehicleModelAdmin(admin.ModelAdmin):
    pass


admin.site.register(Automobile)
admin.site.register(Manufacturer)
admin.site.register(VehicleModel, VehicleModelAdmin)
