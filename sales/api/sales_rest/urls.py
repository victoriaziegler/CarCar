from django.urls import path

from .views import (
    api_sales,
    api_sales_person,
    api_customer,
)

urlpatterns = [
    path("sales/", api_sales, name="api_sales",),
    path("sales_people/", api_sales_person, name="api_sales_person",),
    path("customers/", api_customer, name="api_customer",),
]