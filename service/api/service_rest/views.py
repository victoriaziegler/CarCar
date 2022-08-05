from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Technician, ServiceAppointment, AutomobileVO
from .encoders import AutomobileVOEncoder, TechnicianEncoder, ServiceAppointmentEncoder


@require_http_methods(["GET", "POST"])
def api_services_appointments(request):
    if request.method == "GET":
        services = ServiceAppointment.objects.all()
        for service in services:
            if service.vin in AutomobileVO.objects.values_list("vin", flat=True):
                service.vip = True
            else:
                service.vip = False
        return JsonResponse(
            {"services": services},
            encoder=ServiceAppointmentEncoder,
        )
    else:
        mostrar = json.loads(request.body)
        try:
            if "technician" in mostrar:
                technician = Technician.objects.get(name=mostrar["technician"])
                mostrar["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "No technician is name like that, pls try again"},
                status=400,
            )
        appointment = ServiceAppointment.objects.create(**mostrar)
        return JsonResponse(
            appointment,
            encoder=ServiceAppointmentEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_delete_update_service_appointment(request, pk):
    if request.method == "GET":
        try:
            service = ServiceAppointment.objects.get(id=pk)
            return JsonResponse(
                service,
                encoder=ServiceAppointmentEncoder,
                safe=False
            )
        except ServiceAppointment.DoesNotExist:
            response = JsonResponse({"message": "service does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            service = ServiceAppointment.objects.get(id=pk)
            service.delete()
            return JsonResponse(
                service,
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )
        except ServiceAppointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:  # PUT
        try:
            content = json.loads(request.body)
            service = ServiceAppointment.objects.get(id=pk)

            props = ["owner_name", "date", "time",
                     "technician", "reason", "finished"]
            for prop in props:
                if prop in content:
                    setattr(service, prop, content[prop])
            service.save()
            return JsonResponse(
                service,
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )
        except ServiceAppointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "No technician was created, pls try again or ask for help"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_delete_update_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "technician does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            tech = Technician.objects.get(id=pk)
            tech.delete()
            return JsonResponse(
                tech,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technican does not exist"})
    else:  # PUT
        try:
            content = json.loads(request.body)
            technn = Technician.objects.get(id=pk)
            props = ["name", "employee_number"]
            for prop in props:
                if prop in content:
                    setattr(technn, prop, content[prop])
            technn.save()
            return JsonResponse(
                technn,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": " technician Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET"])
def api_automobiles_vos(request):
    autos = AutomobileVO.objects.all()
    return JsonResponse(
        {"automobiles": autos},
        encoder=AutomobileVOEncoder,
        safe=False,
    )
