from common.json import ModelEncoder

from .models import Technician, ServiceAppointment, AutomobileVO


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number",
    ]
    # encoders = {
    #     "manufacturer": (),
    # }


class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "vin",
        "owner_name",
        "date",
        "time",
        "technician",
        "reason",
        "finished",
        "vip",
    ]
    encoders = {
        # "vin": AutomobileVOEncoder(),
        "technician": TechnicianEncoder(),
    }
