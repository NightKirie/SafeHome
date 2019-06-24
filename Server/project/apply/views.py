from django.shortcuts import render
from django.http import HttpResponse
from .models import Case
from check.models import CaseFiles
from authentication.views import group_required

import json
import os
import csv
import datetime
import shutil

# Create your views here.


today = ""
count = 0


@group_required('HouseOwner', 'Volunteer')
def home(request):
    path = os.path.abspath('.') + "/templates/apply.html"
    return render(request, path)


@group_required('HouseOwner', 'Volunteer')
def upload(request):
    address = nullInputHandle(request.POST.get("county"), 1) + nullInputHandle(request.POST.get("district"), 1) + nullInputHandle(request.POST.get("road"), 1) + nullInputHandle(request.POST.get("section"), 1) + nullInputHandle(request.POST.get("lane"), 1) + nullInputHandle(request.POST.get("alley"), 1) + nullInputHandle(request.POST.get("number"), 1) + nullInputHandle(request.POST.get("numberD"), 1) + nullInputHandle(request.POST.get("floor"), 1) + nullInputHandle(request.POST.get("floorD"), 1) + nullInputHandle(request.POST.get("room"), 1)

    if Case.objects.filter(address=address):
        if Case.objects.filter(name=request.POST.get("name")):
            return HttpResponse('<p class="error" id="caseExists">case exists</p>')
        else:
            Case.objects.create(SN=generateSN(),
                                name=nullInputHandle(request.POST.get("name"), 0),
                                lineID=nullInputHandle(request.POST.get("lineID"), 0),
                                username=request.user.username,
                                phone=nullInputHandle(request.POST.get("phone"), 0),
                                relation=nullInputHandle(request.POST.get("relation"), 0),
                                wishDate=nullInputHandle(request.POST.get("date"), 0),
                                address=address,
                                addressLatitude=request.POST.get("lat"),
                                addressLongitude=request.POST.get("lng"),
                                addressCounty=nullInputHandle(request.POST.get("county"), 0),
                                addressDistrict=nullInputHandle(request.POST.get("district"), 0),
                                addressRoad=nullInputHandle(request.POST.get("road"), 0),
                                addressSection=nullInputHandle(request.POST.get("section"), 0),
                                addressLane=nullInputHandle(request.POST.get("lane"), 0),
                                addressAlley=nullInputHandle(request.POST.get("alley"), 0),
                                addressNumber=nullInputHandle(request.POST.get("number"), 0),
                                addressNumberD=nullInputHandle(request.POST.get("numberD"), 0),
                                addressFloor=nullInputHandle(request.POST.get("floor"), 0),
                                addressFloorD=nullInputHandle(request.POST.get("floorD"), 0),
                                addressRoom=nullInputHandle(request.POST.get("room"), 0),
                                buildingAge=nullInputHandle(request.POST.get("age"), 0),
                                buildingType=nullInputHandle(request.POST.get("type"), 0),
                                buildingFloors=nullInputHandle(request.POST.get("floors"), 0),
                                buildingRemarks=nullInputHandle(request.POST.get("remarks"), 0),
                                assign=0,
                                checked=0,
                                applyDate=datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S"))

            # verification
            if Case.objects.filter(name=request.POST.get("name"), address=address):
                case = Case.objects.get(name=request.POST.get("name"), address=address)
            else:
                return HttpResponse('<p class="error" id="unknown">application failed</p>')

            path = os.path.abspath('.') + "/check/casefiles/case" + case.SN
            CaseFiles.objects.create(SN=case.SN, address=case.address, path=path)

            if os.path.exists(path):
                shutil.rmtree(path)
            os.mkdir(path)

            #verification
            if CaseFiles.objects.filter(SN=case.SN):
                if os.path.exists(CaseFiles.objects.get(SN=case.SN).path):
                    return HttpResponse('<p class="success" id="success">success</p>')
                else:
                    return HttpResponse('<p class="error" id="filesystem">failed to create directory</p>')
            else:
                return HttpResponse('<p class="error" id="database">failed to create object in casefiles</p>')
    else:
        Case.objects.create(SN=generateSN(),
                            name=nullInputHandle(request.POST.get("name"), 0),
                            lineID=nullInputHandle(request.POST.get("lineID"), 0),
                            username=request.user.username,
                            phone=nullInputHandle(request.POST.get("phone"), 0),
                            relation=nullInputHandle(request.POST.get("relation"), 0),
                            wishDate=nullInputHandle(request.POST.get("date"), 0),
                            address=address,
                            addressLatitude=request.POST.get("lat"),
                            addressLongitude=request.POST.get("lng"),
                            addressCounty=nullInputHandle(request.POST.get("county"), 0),
                            addressDistrict=nullInputHandle(request.POST.get("district"), 0),
                            addressRoad=nullInputHandle(request.POST.get("road"), 0),
                            addressSection=nullInputHandle(request.POST.get("section"), 0),
                            addressLane=nullInputHandle(request.POST.get("lane"), 0),
                            addressAlley=nullInputHandle(request.POST.get("alley"), 0),
                            addressNumber=nullInputHandle(request.POST.get("number"), 0),
                            addressNumberD=nullInputHandle(request.POST.get("numberD"), 0),
                            addressFloor=nullInputHandle(request.POST.get("floor"), 0),
                            addressFloorD=nullInputHandle(request.POST.get("floorD"), 0),
                            addressRoom=nullInputHandle(request.POST.get("room"), 0),
                            buildingAge=nullInputHandle(request.POST.get("age"), 0),
                            buildingType=nullInputHandle(request.POST.get("type"), 0),
                            buildingFloors=nullInputHandle(request.POST.get("floors"), 0),
                            buildingRemarks=nullInputHandle(request.POST.get("remarks"), 0),
                            assign=0,
                            checked=0,
                            applyDate=datetime.datetime.now().strftime("%Y/%m/%d"))

        # verification
        if Case.objects.filter(name=request.POST.get("name"), address=address):
            case = Case.objects.get(name=request.POST.get("name"), address=address)
        else:
            return HttpResponse('<p class="error" id="unknown">application failed</p>')

        path = os.path.abspath('.') + "/check/casefiles/case" + case.SN
        CaseFiles.objects.create(SN=case.SN, address=case.address, path=path)

        if os.path.exists(path):
            shutil.rmtree(path)
        os.mkdir(path)

        #verification
        if CaseFiles.objects.filter(SN=case.SN):
            if os.path.exists(CaseFiles.objects.get(SN=case.SN).path):
                return HttpResponse('<p class="success" id="success">success</p>')
            else:
                return HttpResponse('<p class="error" id="filesystem">failed to create directory</p>')
        else:
            return HttpResponse('<p class="error" id="database">failed to create object in casefiles</p>')


def nullInputHandle(input, mode):
    if mode == 0:
        if not input:
            data = "none"
            return data
        else:
            return input

    if mode == 1:
        if not input:
            data = ""
            return data
        else:
            return input

    if mode == 2:
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


# modify application
@group_required('HouseOwner', 'Volunteer')
def modifyHome(request):
    path = os.path.abspath('.') + "/templates/modifyApplication.html"
    return render(request, path)


@group_required('HouseOwner', 'Volunteer')
def modifyFetch(request):
    SN = request.POST.get("sn")
    response = []
    if Case.objects.filter(SN=SN):
        case = Case.objects.get(SN=SN)
        if case.checked == '0':
            if case.username == request.user.username:
                response.append('<ul class="case">')
                response.append('<li class="sn">' + case.SN + '</li>')
                response.append('<li class="name">' + nullInputHandle(case.name, 2) + '</li>')
                response.append('<li class="lineID">' + nullInputHandle(case.lineID, 2) + '</li>')
                response.append('<li class="phone">' + nullInputHandle(case.phone, 2) + '</li>')
                response.append('<li class="relation">' + nullInputHandle(case.relation, 2) + '</li>')
                response.append('<li class="wishDate">' + nullInputHandle(case.wishDate, 2) + '</li>')
                response.append('<li class="addressCounty">' + nullInputHandle(case.addressCounty, 2) + '</li>')
                response.append('<li class="addressDistrict">' + nullInputHandle(case.addressDistrict, 2) + '</li>')
                response.append('<li class="addressRoad">' + nullInputHandle(case.addressRoad, 2) + '</li>')
                response.append('<li class="addressSection">' + nullInputHandle(case.addressSection, 2) + '</li>')
                response.append('<li class="addressLane">' + nullInputHandle(case.addressLane, 2) + '</li>')
                response.append('<li class="addressAlley">' + nullInputHandle(case.addressAlley, 2) + '</li>')
                response.append('<li class="addressNumber">' + nullInputHandle(case.addressNumber, 2) + '</li>')
                response.append('<li class="addressNumberD">' + nullInputHandle(case.addressNumberD, 2) + '</li>')
                response.append('<li class="addressFloor">' + nullInputHandle(case.addressFloor, 2) + '</li>')
                response.append('<li class="addressFloorD">' + nullInputHandle(case.addressFloorD, 2) + '</li>')
                response.append('<li class="addressRoom">' + nullInputHandle(case.addressRoom, 2) + '</li>')
                response.append('<li class="buildingAge">' + nullInputHandle(case.buildingAge, 2) + '</li>')
                response.append('<li class="buildingType">' + nullInputHandle(case.buildingType, 2) + '</li>')
                response.append('<li class="buildingFloors">' + nullInputHandle(case.buildingFloors, 2) + '</li>')
                response.append('<li class="buildingRemarks">' + nullInputHandle(case.buildingRemarks, 2) + '</li>')
                response.append('</ul>')
#                return HttpResponse(json.dumps(response, ensure_ascii=False),
#                                   content_type="application/json")
                return HttpResponse(response)
            else:
                return HttpResponse('<p class="error" id="permission">permission denied</p>')
        else:
            return HttpResponse('<p class="error" id="checked">case is checked</p>')
    else:
        return HttpResponse('<p class="error" id="notFound">case not found</p>')


@group_required('HouseOnwer', 'Volunteer')
def modify(request):
    address = nullInputHandle(request.POST.get("county"), 1) + nullInputHandle(request.POST.get("district"), 1) + nullInputHandle(request.POST.get("road"), 1) + nullInputHandle(request.POST.get("section"), 1) + nullInputHandle(request.POST.get("lane"), 1) + nullInputHandle(request.POST.get("alley"), 1) + nullInputHandle(request.POST.get("number"), 1) + nullInputHandle(request.POST.get("numberD"), 1) + nullInputHandle(request.POST.get("floor"), 1) + nullInputHandle(request.POST.get("floorD"), 1) + nullInputHandle(request.POST.get("room"), 1)

    if Case.objects.filter(SN=request.POST.get('sn')):
        case = Case.objects.get(SN=request.POST.get('sn'))
        if case.username == request.user.username:
            if case.lineID != nullInputHandle(request.POST.get('lineID'), 0):
                case.lineID = nullInputHandle(request.POST.get('lineID'), 0)
            if case.phone != nullInputHandle(request.POST.get('phone'), 0):
                case.phone = nullInputHandle(request.POST.get('phone'), 0)
            if case.relation != nullInputHandle(request.POST.get('relation'), 0):
                case.relation = nullInputHandle(request.POST.get('relation'), 0)
            if case.wishDate != nullInputHandle(request.POST.get('date'), 0):
                case.wishDate = nullInputHandle(request.POST.get('date'), 0)
            if case.address != address:
                case.address = address
                case.addressCounty = nullInputHandle(request.POST.get('county'), 0)
                case.addressDistrict = nullInputHandle(request.POST.get('district'), 0)
                case.addressRoad = nullInputHandle(request.POST.get('road'), 0)
                case.addressSection = nullInputHandle(request.POST.get('section'), 0)
                case.addressLane = nullInputHandle(request.POST.get('lane'), 0)
                case.addressAlley = nullInputHandle(request.POST.get('alley'), 0)
                case.addressNumber = nullInputHandle(request.POST.get('number'), 0)
                case.addressNumberD = nullInputHandle(request.POST.get('numberD'), 0)
                case.addressFloor = nullInputHandle(request.POST.get('floor'), 0)
                case.addressFloorD = nullInputHandle(request.POST.get('floorD'), 0)
                case.addressRoom = nullInputHandle(request.POST.get('room'), 0)
            if case.buildingAge != nullInputHandle(request.POST.get('age'), 0):
                case.buildingAge = nullInputHandle(request.POST.get('age'), 0)
            if case.buildingType != nullInputHandle(request.POST.get('type'), 0):
                case.buildingType = nullInputHandle(request.POST.get('type'), 0)
            if case.buildingFloors != nullInputHandle(request.POST.get("floors"), 0):
                case.buildingFloors = nullInputHandle(request.POST.get("floors"), 0)
            if case.buildingRemarks != nullInputHandle(request.POST.get('remarks'), 0):
                case.buildingRemarks = nullInputHandle(request.POST.get('remarks'), 0)
            case.applyDate = datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S")

            case.save()

            return HttpResponse('<p class="success" id="success">success</p>')
        else:
            return HttpResponse('<p class="error" id="permission">permission denied</p>')
    else:
        return HttpResponse('<p class="error" id="notFound">case not found</p>')
