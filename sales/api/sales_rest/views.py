from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import AutomobileVO, Customer, SaleRecord, SalesPerson
from .encoders import (
    AutomobileVOEncoder,
    CustomerEncoder,
    SaleRecordEncoder,
    SalesPersonEncoder,
)


@require_http_methods(["GET", "POST"])
def api_sales(request):
    """
    Collection RESTful API handler for SaleRecord objects in
    the inventory.

    GET:
    Returns a dictionary with a single key "sales" which
    is a list of the price, automobile, customer(purchaser), and 
    sales person, along with its href and id.

    {
        "sales": [
            {
                "id": database id for the sale,
                "price": sale's price number,
                "automobile": the VIN for the automobile,
                "customer": the purchaser(customer) of the sale,
                "sales person": the sales person of the sale,
                "href": URL to the sale,
            },
            ...
        ]
    }

    POST:
    Creates a sale resource and returns its details.
    {
        "price": sale's price number,
        "automobile": the VIN for the automobile,
        "customer": the purchaser(customer) of the sale,
        "sales person": the sales person of the sale,
    }
    """
    if request.method == "GET":
        sales = SaleRecord.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleRecordEncoder,
        )
    else:
        try:
            content = json.loads(request.body)

            automobile_id = content["automobile_vo_id"]
            automobile = AutomobileVO.objects.get(pk=automobile_id)
            content["automobile"] = automobile

            customer_id = content["customer_id"]
            customer = Customer.objects.get(pk=customer_id)
            content["customer"] = customer

            sales_person_id = content["sales_person_id"]
            sales_person = SalesPerson.object.get(pk=sales_person_id)
            content["sales_person"] = sales_person
            
            sales = SaleRecord.objects.create(**content)
            return JsonResponse(
                sales,
                encoder=SaleRecordEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create sale record"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST"])
def api_sales_person(request):
    """
    Collection RESTful API handler for SalesPerson objects in
    the inventory.

    GET:
    Returns a dictionary with a single key "sales_people" which
    is a list of the name and employee number, along with its id.

    {
        "sales": [
            {
                "id": database id for the sales person,
                "name": sales person's name,
                "employee_number": the sales person's employee number,
            },
            ...
        ]
    }

    POST:
    Creates a sales person resource and returns its details.
    {
        "name": sales person's name,
        "employee_number": the sales person's employee number,
    }
    """
    if request.method == "GET":
        sales_people = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_people": sales_people},
            encoder=SalesPersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create sales person"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST"])
def api_customer(request):
    """
    Collection RESTful API handler for Customer objects in
    the inventory.

    GET:
    Returns a dictionary with a single key "customers" which
    is a list of the name along with its id.

    {
        "sales": [
            {
                "id": database id for the customer,
                "name": customer's name,
            ...
        ]
    }

    POST:
    Creates a customer resource and returns its details.
    {
        "name": customer's name,
    }
    """
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create customer"}
            )
            response.status_code = 400
            return response


