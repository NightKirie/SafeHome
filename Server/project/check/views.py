# from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage
from django.contrib.auth.models import User
from .models import CaseFiles
from apply.models import Case
from authentication.views import group_required

import json
import os
import shutil
# Create your views here.


@group_required('Volunteer')
def home(request):
    path = os.path.abspath('.') + "/templates/check.html"
    return render(request, path)


@group_required('Volunteer')
def upload(request):
    SN = request.POST.get('sn')
    uploadFiles = request.FILES.getlist('file')

    if CaseFiles.objects.filter(SN=SN):
        if Case.objects.get(SN=SN).checked == 0:
            fs = FileSystemStorage()
            path = os.path.abspath('.') + "/uploads"
            destination = os.path.abspath('.') + "/check/casefiles/case" + SN

            for f in uploadFiles:
                if f.name.endswith('.html'):
                    fs.save('result'+SN+'.html', f)
                else:
                    fs.save(f.name, f)

            for f in os.listdir(destination):
                os.remove(f)

            for f in os.listdir(path):
                shutil.move(path + "/" + f, destination)

            Case.objects.filter(SN=SN).update(checked=1)

            return HttpResponse(json.dumps({'statusCode': 'success'}),
                                content_type="application/json")

        else:
            return HttpResponse(json.dumps({'statusCode': 'exist'}),
                                content_type="application/json")
    else:
        return HttpResponse(json.dumps({'statusCode': 'failed'}),
                            content_type="application/json")


@group_required('Volunteer', 'Engineer')
def result(request):
    SN = request.POST.get('sn')
    case = CaseFiles.objects.get(SN=SN)

    if(os.path.isfile(case.path + "/result" + SN + ".html") == True):
        return render(request, case.path + "/result" + SN + ".html")
    else:
        return HttpResponse(json.dumps({'statusCode': 'failed'}),
                            content_type="application/json")


@group_required('Volunteer', 'Engineer')
def showUnassignedCases(request):
    data = Case.objects.filter(assign='0')
    response = []
    for d in data:
        response.append(d.SN + " " + d.name)
    return HttpResponse(response)


@group_required('Volunteer', 'Engineer')
def showCheckedCases(request):
    data = Case.objects.filter(volunteer=request.user.username, checked='1')
    response = []
    for d in data:
        response.append(d.SN + " " + d.name)
    return HttpResponse(response)


@group_required('Volunteer', 'Engineer')
def showMyCases(request):
    data = Case.objects.filter(username=request.user.username, checked='0')
    response = []
    for d in data:
        response.append(d.SN + " " + d.name)
    return HttpResponse(response)


@group_required('Volunteer', 'Engineer')
def showDetail(request):
    case = Case.objects.get(name=request.GET.get('name'),
                            address=request.GET.get('address'))
    response = []
    response.append(case.name)
    response.append(case.buildingType)
    response.append(case.address)
    response.append(case.phone)
    response.append(case.applyDate)
    return HttpResponse(response)


@group_required('Volunteer', 'Engineer')
def assign(request):
    SN = request.POST.get('sn')
    Case.objects.filter(SN=SN).update(volunteer=request.user.username)
    if Case.objects.get(SN=SN).volunteer == request.user.username:
        Case.objects.filter(SN=SN).update(assign=1)
        return HttpResponse(json.dumps({'statusCode': 'success'}),
                            content_type="application/json")
    else:
        return HttpResponse(json.dumps({'statusCode': 'failed'}),
                            content_type="application/json")
