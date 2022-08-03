import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something

from service_rest.models import AutomobileVO

def get_automobiles():
    print("RUNNING FUNCTION")
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    print("RESPONSE", response)
    content = json.loads(response.content)
    print("CONTENT", content)
    for auto in content["autos"]:
        try:
            AutomobileVO.objects.update_or_create(
                vin=auto["vin"],
                defaults={
                    "vin": auto["vin"],
                },
            )
        except Exception as e:
            print("ERROR", e, file=sys.stderr)
        print("SUCCESS", auto)

def poll():
    while True:
        print('I am polling and ready to roll')
        try:
            # Write your polling logic, here
            get_automobiles()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
