from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Technician, ServiceAppointment, AutomobileVO
from .encoders import AutomobileVOEncoder, TechnicianEncoder, ServiceAppointmentEncoder
# from .encoders import (
#     AutomobileEncoder,
#     ManufacturerEncoder,
#     VehicleModelEncoder,
# )
# from .models import Automobile, Manufacturer, VehicleModel



@require_http_methods(["GET", "POST"])
def api_services_appointments(request):
    if request.method == "GET":
        services = ServiceAppointment.objects.all()
        # services = ServiceAppointment.objects.all().first()
        # services = json.dumps(services, indent=4, sort_keys=True, default=str)
        # services.json.dumps('')
        print(services, "????????????????????????")
        for service in services:
            if service.vin in AutomobileVO.objects.values_list("vin", flat=True):
                service.vip = True
            else:
                service.vip = False
        return JsonResponse(
            {"services": services},
            encoder=ServiceAppointmentEncoder,
        )
#     try:
#         service = service.objects.get(id=pk)
#         service.delete()
#         return JsonResponse(
#           service,
#           encoder=serviceEncoder,
#           safe=False,
#         )
#     except service.DoesNotExist:
#         return JsonResponse({"message": "Does not exist"})
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
    else: # PUT
        try:
            content = json.loads(request.body)
            service = ServiceAppointment.objects.get(id=pk)

            props = ["owner_name", "date", "time", "technician", "reason", "finished"]
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

        # technician = content["technician"]
        # technician = Technician.objects.get(employee_number=technician)
        # content["technician"] = technician

        # app = ServiceAppointment.objects.create(**content)
        # return JsonResponse(
        #     app,
        #     encoder=ServiceAppointmentEncoder,
        #     safe=False
        # )




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
    else: # PUT
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


#             content = json.loads(request.body)
#             model_id = content["model_id"]
#             model = VehicleModel.objects.get(pk=model_id)
#             content["model"] = model
#             auto = Automobile.objects.create(**content)
#             return JsonResponse(
#                 auto,
#                 encoder=AutomobileEncoder,
#                 safe=False,
#             )
#         except:
#             response = JsonResponse(
#                 {"message": "Could not create the automobile"}
#             )
#             response.status_code = 400
#             return response


# @require_http_methods(["DELETE", "GET", "PUT"])
# def api_automobile(request, vin):
#     if request.method == "GET":
#         try:
#             auto = Automobile.objects.get(vin=vin)
#             return JsonResponse(
#                 auto,
#                 encoder=AutomobileEncoder,
#                 safe=False
#             )
#         except Automobile.DoesNotExist:
#             response = JsonResponse({"message": "Does not exist"})
#             response.status_code = 404
#             return response
#     elif request.method == "DELETE":
#         try:
#             auto = Automobile.objects.get(vin=vin)
#             auto.delete()
#             return JsonResponse(
#                 auto,
#                 encoder=AutomobileEncoder,
#                 safe=False,
#             )
#         except Automobile.DoesNotExist:
#             return JsonResponse({"message": "Does not exist"})
#     else: # PUT
#         try:
#             content = json.loads(request.body)
#             auto = Automobile.objects.get(vin=vin)

#             props = ["color", "year"]
#             for prop in props:
#                 if prop in content:
#                     setattr(auto, prop, content[prop])
#             auto.save()
#             return JsonResponse(
#                 auto,
#                 encoder=AutomobileEncoder,
#                 safe=False,
#             )
#         except Automobile.DoesNotExist:
#             response = JsonResponse({"message": "Does not exist"})
#             response.status_code = 404
#             return response


# @require_http_methods(["GET", "POST"])
# def api_manufacturers(request):
#     if request.method == "GET":
#         manufacturers = Manufacturer.objects.all()
#         return JsonResponse(
#             {"manufacturers": manufacturers},
#             encoder=ManufacturerEncoder,
#         )
#     else:
#         try:
#             content = json.loads(request.body)
#             manufacturer = Manufacturer.objects.create(**content)
#             return JsonResponse(
#                 manufacturer,
#                 encoder=ManufacturerEncoder,
#                 safe=False,
#             )
#         except:
#             response = JsonResponse(
#                 {"message": "Could not create the manufacturer"}
#             )
#             response.status_code = 400
#             return response


# @require_http_methods(["DELETE", "GET", "PUT"])
# def api_manufacturer(request, pk):
#     if request.method == "GET":
#         try:
#             manufacturer = Manufacturer.objects.get(id=pk)
#             return JsonResponse(
#                 manufacturer,
#                 encoder=ManufacturerEncoder,
#                 safe=False
#             )
#         except Manufacturer.DoesNotExist:
#             response = JsonResponse({"message": "Does not exist"})
#             response.status_code = 404
#             return response
#     elif request.method == "DELETE":
#         try:
#             manufacturer = Manufacturer.objects.get(id=pk)
#             manufacturer.delete()
#             return JsonResponse(
#                 manufacturer,
#                 encoder=ManufacturerEncoder,
#                 safe=False,
#             )
#         except Manufacturer.DoesNotExist:
#             return JsonResponse({"message": "Does not exist"})
#     else: # PUT
#         try:
#             content = json.loads(request.body)
#             manufacturer = Manufacturer.objects.get(id=pk)

#             props = ["name"]
#             for prop in props:
#                 if prop in content:
#                     setattr(manufacturer, prop, content[prop])
#             manufacturer.save()
#             return JsonResponse(
#                 manufacturer,
#                 encoder=ManufacturerEncoder,
#                 safe=False,
#             )
#         except Manufacturer.DoesNotExist:
#             response = JsonResponse({"message": "Does not exist"})
#             response.status_code = 404
#             return response


# @require_http_methods(["GET", "POST"])
# def api_vehicle_models(request):
#     if request.method == "GET":
#         models = VehicleModel.objects.all()
#         return JsonResponse(
#             {"models": models},
#             encoder=VehicleModelEncoder
#         )
#     else:
#         try:
#             content = json.loads(request.body)
#             manufacturer_id = content["manufacturer_id"]
#             manufacturer = Manufacturer.objects.get(id=manufacturer_id)
#             content["manufacturer"] = manufacturer
#             model = VehicleModel.objects.create(**content)
#             return JsonResponse(
#                 model,
#                 encoder=VehicleModelEncoder,
#                 safe=False,
#             )
#         except:
#             response = JsonResponse(
#                 {"message": "Could not create the vehicle model"}
#             )
#             response.status_code = 400
#             return response


# @require_http_methods(["DELETE", "GET", "PUT"])
# def api_vehicle_model(request, pk):
#     if request.method == "GET":
#         try:
#             model = VehicleModel.objects.get(id=pk)
#             return JsonResponse(
#                 model,
#                 encoder=VehicleModelEncoder,
#                 safe=False
#             )
#         except VehicleModel.DoesNotExist:
#             response = JsonResponse({"message": "Does not exist"})
#             response.status_code = 404
#             return response
#     elif request.method == "DELETE":
#         try:
#             model = VehicleModel.objects.get(id=pk)
#             model.delete()
#             return JsonResponse(
#                 model,
#                 encoder=VehicleModelEncoder,
#                 safe=False,
#             )
#         except VehicleModel.DoesNotExist:
#             return JsonResponse({"message": "Does not exist"})
#     else: # PUT
#         try:
#             content = json.loads(request.body)
#             model = VehicleModel.objects.get(id=pk)
#             props = ["name", "picture_url"]
#             for prop in props:
#                 if prop in content:
#                     setattr(model, prop, content[prop])
#             model.save()
#             return JsonResponse(
#                 model,
#                 encoder=VehicleModelEncoder,
#                 safe=False,
#             )
#         except VehicleModel.DoesNotExist:
#             response = JsonResponse({"message": "Does not exist"})
#             response.status_code = 404
#             return response