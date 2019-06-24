# from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage
# from django.contrib.auth.models import User
from .models import CaseFiles
from apply.models import Case
from authentication.views import group_required

import json
import os
import shutil
import datetime
# Create your views here.


@group_required('Volunteer', 'Engineer')
def home(request):
    path = os.path.abspath('.') + "/templates/check.html"
    return render(request, path)


@group_required('Volunteer')
def upload(request):
    SN = request.POST.get('sn')
    uploadFiles = request.FILES.getlist('file')
    print(uploadFiles)

    if CaseFiles.objects.filter(SN=SN):
        if Case.objects.get(SN=SN).assign == '1' and Case.objects.get(SN=SN).volunteer == request.user.username:
            fs = FileSystemStorage()
            path = os.path.abspath('.') + "/uploads"
            destination = CaseFiles.objects.get(SN=SN).path

            jpegCount = 0
            pngCount = 0
            for f in uploadFiles:
                if f.name.endswith('.html'):
                    fs.save('result'+SN+'.html', f)
                if f.name.endswith('.jpg'):
                    fs.save('jpeg'+str(jpegCount)+'.jpg', f)
                    jpegCount = jpegCount + 1
                if f.name.endswith('.png'):
                    fs.save('png'+str(pngCount)+'.png', f)
                    pngCount = pngCount + 1

            for f in os.listdir(destination):
                os.remove(destination + "/" + f)

            for f in os.listdir(path):
                shutil.move(path + "/" + f, destination)

            Case.objects.filter(SN=SN).update(checked='1',
                                              checkDate=request.POST.get('date'))
            CaseFiles.objects.filter(SN=SN).update(volunteer=request.POST.get('volunteer'),
                                                   checkDate=request.POST.get('date'),
                                                   buildingFloors=request.POST.get('floors'),
                                                   buildingDesignYear=request.POST.get('designYear'),
                                                   buildingHouseholdCount=request.POST.get('householdCount'),
                                                   buildingStructure=request.POST.get('structure'),
                                                   name=request.POST.get('name'),
                                                   jpegCount=jpegCount,
                                                   pngCount=pngCount,
                                                   phone=request.POST.get('phone'))
            return HttpResponse('<p class="success" id="success">success</p>')

        else:
            if Case.objects.get(SN=SN).assign == '0':
                return HttpResponse('<p class="error" id="notAssigned">case not assigned</p>')
            if Case.objects.get(SN=SN).volunteer != request.user.username:
                return HttpResponse('<p class="error" id="permission">permission denied</p>')
    else:
        return HttpResponse('<p class="error" id="notFound">case not found</p>')


@group_required('Volunteer', 'Engineer')
def getReport(request):
    SN = request.POST.get('sn')
    if CaseFiles.objects.filter(SN=SN):
        if Case.objects.get(SN=SN).volunteer == request.user.username or request.user.groups.filter(name="Engineer").exists() is True or request.user.is_superuser is True:
            if Case.objects.get(SN=SN).checked == '1':
                case = CaseFiles.objects.get(SN=SN)
                if os.path.isfile(case.path + "/result" + SN + ".html") is True:
                    # return render(request, case.path + "/result" + SN + ".html")

                    # respond with an attachment
                    openFile = open(case.path + "/result" + SN + ".html", 'r')
                    response = HttpResponse(openFile.read(), content_type="text/html")
                    response['Content-Disposition'] = 'attachment; filename="result' + SN + '.html"'
                    return response
                else:
                    # openFile = open(case.path + "/freebear.jpg", 'rb')
                    # response = HttpResponse(openFile.read(), content_type='image/jpeg')
                    # response['Content-Disposition'] = 'attachment; filename="freebear.jpg"'
                    # return response
                    return HttpResponse('<p class="error" id="notFound">file not found</p>')
            else:
                return HttpResponse('<p class="error" id="notChecked">case not checked</p>')
        else:
            return HttpResponse('<p class="error" id="permission">permission denied</p>')
    else:
        return HttpResponse('<p class="error" id="notFound">case not found</p>')


@group_required('Volunteer', 'Engineer')
def getPhotoCount(request):
    SN = request.POST.get('sn')
    response = '<p class="success" id="count">' + str(CaseFiles.objects.get(SN=SN).jpegCount) + '</p>'
    return HttpResponse(response)


@group_required('Volunteer', 'Engineer')
def getPhoto(request):
    SN = request.POST.get('sn')
    filename = request.POST.get('filename')
    if CaseFiles.objects.filter(SN=SN):
        if Case.objects.get(SN=SN).volunteer == request.user.username or request.user.groups.filter(name="Engineer").exists() is True or request.user.is_superuser is True:
            if Case.objects.get(SN=SN).checked == '1':
                case = CaseFiles.objects.get(SN=SN)
                if os.path.isfile(case.path + "/" + filename) is True:
                    openFile = open(case.path + "/" + filename, 'rb')
                    response = HttpResponse(openFile.read(), content_type='image/jpeg')
                    response['Content-Disposition'] = 'attachment; filename="' + filename
                    return response
                else:
                    return HttpResponse('<p class="error" id="notFound">file not found</p>')
            else:
                return HttpResponse('<p class="error" id="notChecked">case not checked</p>')
        else:
            return HttpResponse('<p class="error" id="permission">permission denied</p>')
    else:
        return HttpResponse('<p class="error" id="notFound">case not found</p>')


@group_required('Volunteer', 'Engineer')
def showUnassignedCases(request):
    data = Case.objects.filter(assign='0')
    response = []
    if data.count():
        response.append('<p class="success" id="found">found case</p>')
        for d in data:
            response.append('<ul class="case">')
            response.append('<li class="sn">' + d.SN + '</li>')
            response.append('<li class="name">' + d.name + '</li>')
            response.append('<li class="date">' + d.applyDate + '</li>')
            response.append('</ul>')
        return HttpResponse(response)
    else:
        return HttpResponse('<p class="error" id="notFound">case not found</p>')


@group_required('Volunteer')
def volunteerShowCheckedCases(request):
    data = Case.objects.filter(volunteer=request.user.username, checked='1')
    response = []
    if data.count():
        response.append('<p class="success" id="found">found case</p>')
        for d in data:
            response.append('<ul class="case">')
            response.append('<li class="sn">' + d.SN + '</li>')
            response.append('<li class="name">' + d.name + '</li>')
            response.append('</ul>')
        return HttpResponse(response)
    else:
        return HttpResponse('<p class="error" id="notFound">case not found</p>')


@group_required('Volunteer')
def volunteerShowNotCheckedCases(request):
    data = Case.objects.filter(volunteer=request.user.username, checked='0')
    response = []
    if data.count():
        response.append('<p class="success" id="found">found case</p>')
        for d in data:
            response.append('<ul class="case">')
            response.append('<li class="sn">' + d.SN + '</li>')
            response.append('<li class="name">' + d.name + '</li>')
            response.append('</ul>')
        return HttpResponse(response)
    else:
        return HttpResponse('<p class="error" id="notFound">case not found</p>')


@group_required('HouseOwner', 'Volunteer')
def personalShowAppliedCases(request):
    data = Case.objects.filter(username=request.user.username)
    response = []
    if data.count():
        response.append('<p class="success" id="found">found case</p>')
        for d in data:
            response.append('<ul class="case">')
            response.append('<li class="sn">' + d.SN + '</li>')
            response.append('<li class="name">' + d.address + '</li>')
            response.append('<li class="checked">' + d.checked + '</li>')
            response.append('</ul>')
        return HttpResponse(response)
    else:
        return HttpResponse('<p class="error" id="notFound">case not found</p>')


@group_required('Engineer')
def engineerShowChecks(request):
    data = Case.objects.filter(checked='1')
    response = []
    if data.count():
        response.append('<p class="success" id="found">found case</p>')
        for d in data:
            response.append('<ul class="case">')
            response.append('<li class="sn">' + d.SN + '</li>')
            response.append('<li class="name">' + d.address + '</li>')
            response.append('</ul>')
        return HttpResponse(response)
    else:
        return HttpResponse('<p class="error" id="notFound">case not found</p>')


@group_required('Volunteer', 'Engineer')
def showDetail(request):
    if Case.objects.filter(SN=request.POST.get('sn')):
        case = Case.objects.get(SN=request.POST.get('sn'))
        response = []
        response.append('<p class="success" id="found">found case</p>')
        response.append('<ul class="case">')
        response.append('<li class="sn">' + case.SN + '</li>')
        response.append('<li class="name">' + case.name + '</li>')
        response.append('<li class="buildingType">' + case.buildingType + '</li>')
        response.append('<li class="address">' + case.address + '</li>')
        response.append('<li class="lat">' + str(case.addressLatitude) + '</li>')
        response.append('<li class="lng">' + str(case.addressLongitude) + '</li>')
        response.append('<li class="phone">' + case.phone + '</li>')
        response.append('<li class="applyDate">' + case.applyDate + '</li>')
        response.append('</ul>')
        return HttpResponse(response)
    else:
        return HttpResponse('<p class="error" id="notFound">case not found</p>')


@group_required('Volunteer')
def assign(request):
    SN = request.POST.get('sn')
    if Case.objects.filter(SN=SN):
        if Case.objects.get(SN=SN).assign == '0':
            Case.objects.filter(SN=SN).update(volunteer=request.user.username,
                                              assign='1')
            return HttpResponse('<p class="success" id="success">success</p>')
        else:
            return HttpResponse('<p class="error" id="byOthers">assigned by others</p>')

    else:
        return HttpResponse('<p class="error" id="notFound">case not found</p>')
