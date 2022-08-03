from django.urls import path

from .views import (
    api_services_appointments,
    api_technicians,
    api_show_delete_update_service_appointment,
    api_automobiles_vos,
    api_show_delete_update_technician
#     # api_manufacturers,
#     # api_manufacturer,
#     # api_vehicle_models,
#     # api_vehicle_model,
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

    # path(
    #     "manufacturers/",
    #     api_manufacturers,
    #     name="api_manufacturers",
    # ),
    # path(
    #     "manufacturers/<int:pk>/",
    #     api_manufacturer,
    #     name="api_manufacturer",
    # ),
    # path(
    #     "models/",
    #     api_vehicle_models,
    #     name="api_vehicle_models",
    # ),
    # path(
    #     "models/<int:pk>/",
    #     api_vehicle_model,
    #     name="api_vehicle_model",
    # ),
]
