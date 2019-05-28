from django.shortcuts import render
from django.http import HttpResponse
from .models import Case
from check.models import CaseFiles
from authentication.views import group_required

import json
import os
import csv
import datetime

# Create your views here.


today = ""
count = 0


@group_required('House', 'Volunteer')
def home(request):
    path = os.path.abspath('.') + "/templates/apply.html"
    return render(request, path)


@group_required('House', 'Volunteer')
def upload(request):
    address = nullInputHandle(request.GET.get("county"), 1) + nullInputHandle(request.GET.get("district"), 1) + nullInputHandle(request.GET.get("road"), 1) + nullInputHandle(request.GET.get("section"), 1) + nullInputHandle(request.GET.get("lane"), 1) + nullInputHandle(request.GET.get("alley"), 1) + nullInputHandle(request.GET.get("number"), 1) + nullInputHandle(request.GET.get("numberD"), 1) + nullInputHandle(request.GET.get("floor"), 1) + nullInputHandle(request.GET.get("floorD"), 1) + nullInputHandle(request.GET.get("room"), 1)
    # if Case.objects.filter(name=request.GET.get("name")):
    if Case.objects.filter(address=address):
        if Case.objects.filter(name=request.GET.get("name")):
            return HttpResponse(json.dumps({'result': 'exist'}),
                                content_type="application/json")
        # 要可以更改資料
        # 用地址判斷
        # 不同人申請同一間，要顯示兩筆？
        else:
            Case.objects.create(SN=generateSN(),
                                name=nullInputHandle(request.GET.get("name"), 0),
                                lineID=nullInputHandle(request.GET.get("LineID"), 0),
                                username=request.user.username,
                                phone=nullInputHandle(request.GET.get("phone"), 0),
                                relation=nullInputHandle(request.GET.get("relation"), 0),
                                wishDate=nullInputHandle(request.GET.get("date"), 0),
                                address=address,
                                addressCounty=nullInputHandle(request.GET.get("county"), 0),
                                addressDistrict=nullInputHandle(request.GET.get("district"), 0),
                                addressRoad=nullInputHandle(request.GET.get("road"), 0),
                                addressSection=nullInputHandle(request.GET.get("section"), 0),
                                addressLane=nullInputHandle(request.GET.get("lane"), 0),
                                addressAlley=nullInputHandle(request.GET.get("alley"), 0),
                                addressNumber=nullInputHandle(request.GET.get("number"), 0),
                                addressNumberD=nullInputHandle(request.GET.get("numberD"), 0),
                                addressFloor=nullInputHandle(request.GET.get("floor"), 0),
                                addressFloorD=nullInputHandle(request.GET.get("floorD"), 0),
                                addressRoom=nullInputHandle(request.GET.get("room"), 0),
                                buildingAge=nullInputHandle(request.GET.get("age"), 0),
                                buildingType=nullInputHandle(request.GET.get("type"), 0),
                                buildingFloors=nullInputHandle(request.GET.get("floors"), 0),
                                buildingRemarks=nullInputHandle(request.GET.get("remarks"), 0),
                                assign=0,
                                checked=0,
                                applyDate=datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S"))
            case = Case.objects.get(name=request.GET.get("name"), address=address)
            path = os.path.abspath('.') + "/check/casefiles/case" + case.SN
            CaseFiles.objects.create(SN=case.SN, name=request.GET.get("name"), path=path)
            os.mkdir(path)
            return HttpResponse(json.dumps({'statusCode': 'success'}),
                                content_type="application/json")
    else:
        Case.objects.create(SN=generateSN(),
                            name=nullInputHandle(request.GET.get("name"), 0),
                            lineID=nullInputHandle(request.GET.get("LineID"), 0),
                            username=request.user.username,
                            phone=nullInputHandle(request.GET.get("phone"), 0),
                            relation=nullInputHandle(request.GET.get("relation"), 0),
                            wishDate=nullInputHandle(request.GET.get("date"), 0),
                            address=address,
                            addressCounty=nullInputHandle(request.GET.get("county"), 0),
                            addressDistrict=nullInputHandle(request.GET.get("district"), 0),
                            addressRoad=nullInputHandle(request.GET.get("road"), 0),
                            addressSection=nullInputHandle(request.GET.get("section"), 0),
                            addressLane=nullInputHandle(request.GET.get("lane"), 0),
                            addressAlley=nullInputHandle(request.GET.get("alley"), 0),
                            addressNumber=nullInputHandle(request.GET.get("number"), 0),
                            addressNumberD=nullInputHandle(request.GET.get("numberD"), 0),
                            addressFloor=nullInputHandle(request.GET.get("floor"), 0),
                            addressFloorD=nullInputHandle(request.GET.get("floorD"), 0),
                            addressRoom=nullInputHandle(request.GET.get("room"), 0),
                            buildingAge=nullInputHandle(request.GET.get("age"), 0),
                            buildingType=nullInputHandle(request.GET.get("type"), 0),
                            buildingFloors=nullInputHandle(request.GET.get("floors"), 0),
                            buildingRemarks=nullInputHandle(request.GET.get("remarks"), 0),
                            assign=0,
                            checked=0,
                            applyDate=datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S"))
        case = Case.objects.get(address=address)
        # case.address = nullInputHandle(case.addressCounty, 1) + nullInputHandle(case.addressDistrict, 1) + nullInputHandle(case.addressRoad, 1) + nullInputHandle(case.addressSection, 1) + nullInputHandle(case.addressLane, 1) + nullInputHandle(case.addressAlley, 1) + nullInputHandle(case.addressNumber, 1) + nullInputHandle(case.addressFloor, 1) + nullInputHandle(case.addressRoom, 1)
        # case.save()
        path = os.path.abspath('.') + "/check/casefiles/case" + case.SN
        CaseFiles.objects.create(SN=case.SN, name=request.GET.get("name"), path=path)
        os.mkdir(path)
        return HttpResponse(json.dumps({'statusCode': 'success'}),
                            content_type="application/json")


def nullInputHandle(input, mode):
    if mode == 0:
        if not input:
            data = "none"
            return data
        else:
            return input
    if mode == 1:
        # if input == "none":
        if not input:
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


def generateSN():
    global today
    global count
    if today == datetime.datetime.now().strftime("%Y%m%d"):
        today = datetime.datetime.now().strftime("%Y%m%d")
        count = 0
    else:
        count = count + 1
        SN = datetime.datetime.now().strftime("%Y%m%d") + '{0:04}'.format(count)
    return SN


@group_required('House', 'Volunteer')
def modify(request):
    address = nullInputHandle(request.GET.get("county"), 1) + nullInputHandle(request.GET.get("district"), 1) + nullInputHandle(request.GET.get("road"), 1) + nullInputHandle(request.GET.get("section"), 1) + nullInputHandle(request.GET.get("lane"), 1) + nullInputHandle(request.GET.get("alley"), 1) + nullInputHandle(request.GET.get("number"), 1) + nullInputHandle(request.GET.get("numberD"), 1) + nullInputHandle(request.GET.get("floor"), 1) + nullInputHandle(request.GET.get("floorD"), 1) + nullInputHandle(request.GET.get("room"), 1)
    if Case.objects.filter(username=request.user.username,
                           SN=request.GET.get('sn')):
        case = Case.objects.get(username=request.user.username,
                                SN=request.GET.get('sn'))
        if case.lineID != nullInputHandle(request.GET.get('LineID'), 0):
            case.lineID = nullInputHandle(request.GET.get('LineID'), 0)
        if case.phone != nullInputHandle(request.GET.get('phone'), 0):
            case.phone = nullInputHandle(request.GET.get('phone'), 0)
        if case.relation != nullInputHandle(request.GET.get('relation'), 0):
            case.relation = nullInputHandle(request.GET.get('relation'), 0)
        if case.wishDate != nullInputHandle(request.GET.get('date'), 0):
            case.wishDate = nullInputHandle(request.GET.get('date'), 0)
        if case.address != address:
            case.address = address
            case.addressCounty = nullInputHandle(request.GET.get('county'), 0)
            case.addressDistrict = nullInputHandle(request.GET.get('district'), 0)
            case.addressRoad = nullInputHandle(request.GET.get('road'), 0)
            case.addressSection = nullInputHandle(request.GET.get('section'), 0)
            case.addressLane = nullInputHandle(request.GET.get('lane'), 0)
            case.addressAlley = nullInputHandle(request.GET.get('alley'), 0)
            case.addressNumber = nullInputHandle(request.GET.get('number'), 0)
            case.addressNumberD = nullInputHandle(request.GET.get('numberD'), 0)
            case.addressFloor = nullInputHandle(request.GET.get('floor'), 0)
            case.addressFloorD = nullInputHandle(request.GET.get('floorD'), 0)
            case.addressRoom = nullInputHandle(request.GET.get('room'), 0)
        if case.buildingAge != nullInputHandle(request.GET.get('age'), 0):
            case.buildingAge = nullInputHandle(request.GET.get('age'), 0)
        if case.buildingType != nullInputHandle(request.GET.get('type'), 0):
            case.buildingType = nullInputHandle(request.GET.get('type'), 0)
        if case.buildingFloors != nullInputHandle(request.GET.get("floors"), 0):
            case.buildingFloors = nullInputHandle(request.GET.get("floors"), 0)
        if case.buildingRemarks != nullInputHandle(request.GET.get('remarks'), 0):
            case.buildingRemarks = nullInputHandle(request.GET.get('remarks'), 0)
        case.applyDate = datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")

        case.save()

        return HttpResponse(json.dumps({'statusCode': 'success'}),
                            content_type="application/json")
    else:
        return HttpResponse(json.dumps({'statusCode': 'failed'}),
                            content_type="application/json")
