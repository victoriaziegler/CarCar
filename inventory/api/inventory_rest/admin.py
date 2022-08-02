from django.contrib import admin
from .models import Manufacturer, VehicleModel, Automobile

class ManufacturerAdmin(admin.ModelAdmin):
    pass

admin.site.register(Automobile)
admin.site.register(Manufacturer, ManufacturerAdmin)
admin.site.register(VehicleModel)
