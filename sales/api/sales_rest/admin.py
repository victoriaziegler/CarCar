from django.contrib import admin
from .models import AutomobileVO, SaleRecord, SalesPerson, Customer


class AutomobileVOAdmin(admin.ModelAdmin):
    pass


class SaleRecordAdmin(admin.ModelAdmin):
    pass


class SalesPersonAdmin(admin.ModelAdmin):
    pass


class CustomerAdmin(admin.ModelAdmin):
    pass


admin.site.register(AutomobileVO, AutomobileVOAdmin)
admin.site.register(SaleRecord, SaleRecordAdmin)
admin.site.register(SalesPerson, SalesPersonAdmin)
admin.site.register(Customer, CustomerAdmin)
