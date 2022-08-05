from django.contrib import admin
from .models import Manufacturer, VehicleModel, Automobile


class ManufacturerAdmin(admin.ModelAdmin):
    pass


class VehicleModelAdmin(admin.ModelAdmin):
    pass


class AutomobileAdmin(admin.ModelAdmin):
    pass


admin.site.register(Automobile, AutomobileAdmin)
admin.site.register(Manufacturer, ManufacturerAdmin)
admin.site.register(VehicleModel, VehicleModelAdmin)
