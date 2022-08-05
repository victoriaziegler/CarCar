from django.urls import path

from .views import (
    api_sales,
    api_sales_person,
    api_customer,
    api_automobilevos,
    api_sales_person_record,
)

urlpatterns = [
    path("sales/", api_sales, name="api_sales",),
    path("sales_people/", api_sales_person, name="api_sales_person",),
    path("customers/", api_customer, name="api_customer",),
    path("automobilevos/", api_automobilevos, name="api_automobilevos"),
    path("sales_person_record/<int:sales_person_id>/",
         api_sales_person_record, name="api_sales_person_record"),
]
