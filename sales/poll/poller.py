import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import AutomobileVO

def get_automobiles():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for auto in content["autos"]:
        try:
            AutomobileVO.objects.update_or_create(
                import_href=auto["href"],
                defaults={
                    "vin": auto["vin"],
                    "is_sold": auto["is_sold"]
                },
            )
        except Exception as e:
            print("ERROR", e, file=sys.stderr)
        print("SUCCESS", auto)

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            get_automobiles()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(15)


if __name__ == "__main__":
    poll()
