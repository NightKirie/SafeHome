from django.shortcuts import render
from django.http import HttpResponse
from .models import Case
from check.models import CaseFiles

import json
import os
import csv

# Create your views here.


def home(request):
    path = os.path.abspath('.') + "/templates/apply.html"
    return render(request, path)


def upload(request):
    if Case.objects.filter(name=request.GET.get("name")):
        return HttpResponse(json.dumps({'result': 'exist'}),
                            content_type="application/json")
    else:
        Case.objects.create(name=request.GET.get("name"),
                            phone=request.GET.get("phone"),
                            email=request.GET.get("email"),
                            address=request.GET.get("address"),
                            relation=request.GET.get("relation"))
        path = os.path.abspath('.') + "/check/casefiles/case" + request.GET.get("name")
        CaseFiles.objects.create(name=request.GET.get("name"), path=path)
        os.mkdir(path)
        return HttpResponse(json.dumps({'result': 0}),
                            content_type="application/json")


# Outputting CSV test
def someView(request):
    response = HttpResponse(content_type="text/csv")
    response['Content-Disposition'] = 'attachment; file="somefilename.csv"'

    writer = csv.writer(response)
    writer.writerow(['First row', Case.objects.get(id=1).name,
                     Case.objects.get(id=1).phone])

    return response
