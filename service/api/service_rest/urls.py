from django.urls import path

from .views import (
    api_services_appointments,
    api_technicians,
    api_show_delete_update_service_appointment,
    api_automobiles_vos,
    api_show_delete_update_technician
)

urlpatterns = [
    path(
        "services/",
        api_services_appointments,
        name="api_services_appointments",
    ),
    path(
        "technicians/",
        api_technicians,
        name="api_technicians",
    ),
    path(
        'services/<int:pk>/',
        api_show_delete_update_service_appointment,
        name="show_delete_update_service_appointment"
    ),
    path(
        'technicians/<int:pk>/',
        api_show_delete_update_technician,
        name="show_delete_update_technician"
    ),
    path(
        "automobilesvos/",
        api_automobiles_vos,
        name="api_automobiles_vos",
    )
]
