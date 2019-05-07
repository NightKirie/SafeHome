from django.shortcuts import render
from django.http import HttpResponse
from .models import Case

import json
import os
import csv

# Create your views here.


def home(request):
    path = os.path.abspath('.') + "/templates/apply.html"
    return render(request, path)


def upload(request):
    Case.objects.create(name=request.GET.get("name"),
                        phone=request.GET.get("phone"),
                        email=request.GET.get("email"),
                        address=request.GET.get("address"),
                        relation=request.GET.get("relation"))
    return HttpResponse(json.dumps({'result': 0}),
                        content_type="application/json")


# Outputting CSV test
def someView(request):
    response = HttpResponse(content_type="text/csv")
    response['Content-Disposition'] = 'attachment; file="somefilename.vsc"'

    writer = csv.writer(response)
    writer.writerow(['First row', Case.objects.get(id=1).name,
                     Case.objects.get(id=1).phone])

    return response
