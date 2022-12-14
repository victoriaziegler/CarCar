from common.json import ModelEncoder

from .models import AutomobileVO, SalesPerson, SaleRecord, Customer


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "vin",
        "is_sold",
    ]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "id",
        "name",
        "employee_number",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
        "address",
        "phone",
    ]


class SaleRecordEncoder(ModelEncoder):
    model = SaleRecord
    properties = [
        "id",
        "price",
        "automobile",
        "customer",
        "sales_person",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "customer": CustomerEncoder(),
        "sales_person": SalesPersonEncoder(),
    }
