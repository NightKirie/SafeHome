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
        Case.objects.create(name=nullInputHandle(request.GET.get("name")),
                            phone=nullInputHandle(request.GET.get("phone")),
                            email=nullInputHandle(request.GET.get("email")),
                            addressCounty=nullInputHandle(request.GET.get("county")),
                            addressDistrict=nullInputHandle(request.GET.get("district")),
                            addressRoad=nullInputHandle(request.GET.get("road")),
                            addressLane=nullInputHandle(request.GET.get("lane")),
                            addressAlley=nullInputHandle(request.GET.get("alley")),
                            addressNumber=nullInputHandle(request.GET.get("number")),
                            addressFloor=nullInputHandle(request.GET.get("floor")),
                            addressRoom=nullInputHandle(request.GET.get("room")),
                            relation=request.GET.get("relation"))
        path = os.path.abspath('.') + "/check/casefiles/case" + request.GET.get("name")
        CaseFiles.objects.create(name=request.GET.get("name"), path=path)
        os.mkdir(path)
        return HttpResponse(json.dumps({'result': 0}),
                            content_type="application/json")


def nullInputHandle(input):
    if not input:
        data = "none"
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
