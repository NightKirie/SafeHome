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
        Case.objects.create(name=nullInputHandle(request.GET.get("name"), 0),
                            phone=nullInputHandle(request.GET.get("phone"), 0),
                            email=nullInputHandle(request.GET.get("email"), 0),
                            addressCounty=nullInputHandle(request.GET.get("county"), 0),
                            addressDistrict=nullInputHandle(request.GET.get("district"), 0),
                            addressRoad=nullInputHandle(request.GET.get("road"), 0),
                            addressLane=nullInputHandle(request.GET.get("lane"), 0),
                            addressAlley=nullInputHandle(request.GET.get("alley"), 0),
                            addressNumber=nullInputHandle(request.GET.get("number"), 0),
                            addressFloor=nullInputHandle(request.GET.get("floor"), 0),
                            addressRoom=nullInputHandle(request.GET.get("room"), 0),
                            relation=nullInputHandle(request.GET.get("relation"), 0))
        case = Case.objects.get(name=request.GET.get("name"))
        case.address = nullInputHandle(case.addressCounty, 1) + nullInputHandle(case.addressDistrict, 1) + nullInputHandle(case.addressRoad, 1) + nullInputHandle(case.addressLane, 1) + nullInputHandle(case.addressAlley, 1) + nullInputHandle(case.addressNumber, 1) + nullInputHandle(case.addressFloor, 1) + nullInputHandle(case.addressRoom, 1)
        case.save()
        path = os.path.abspath('.') + "/check/casefiles/case" + request.GET.get("name")
        CaseFiles.objects.create(name=request.GET.get("name"), path=path)
        os.mkdir(path)
        return HttpResponse(json.dumps({'result': 0}),
                            content_type="application/json")


def nullInputHandle(input, mode):
    if mode == 0:
        if not input:
            data = "none"
            return data
        else:
            return input
    if mode == 1:
        if input == "none":
            data = ""
            return data
        else:
            return input


# Outputting CSV test
def someView(request):
    response = HttpResponse(content_type="text/csv")
    response['Content-Disposition'] = 'attachment; file="somefilename.csv"'

    writer = csv.writer(response)
    writer.writerow(['First row', Case.objects.get(id=1).name,
                     Case.objects.get(id=1).phone])

    return response


# def showCases(request):
#    data = Case.objects.all()
#    for
# 讓model多一個完整地址的欄位，並寫一個function把地址合併完整
