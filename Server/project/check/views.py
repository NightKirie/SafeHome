from django.shortcuts import render
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage
from .models import CaseFiles
from apply.models import Case

import json
import os
import shutil
# Create your views here.


def home(request):
    path = os.path.abspath('.') + "/templates/check.html"
    return render(request, path)


def upload(request):
    name = request.POST.get('name')
    uploadFiles = request.FILES.getlist('file')

    fs = FileSystemStorage()
    path = os.path.abspath('.') + "/uploads"
    destination = os.path.abspath('.') + "/check/casefiles/case" + name

    # if(os.path.isdir(destination) == False):
    #     os.mkdir(destination)
    #     CaseFiles.objects.create(name=request.POST.get('name'),
    #                              path=destination)

    for f in uploadFiles:
        fs.save(f.name, f)

    for f in os.listdir(path):
        shutil.move(path + "/" + f, destination)

    Case.objects.filter(name=name).update(checked=1)

    return HttpResponse(json.dumps({'statusCode': 'success'}),
                        content_type="application/json")


def result(request):
    name = request.POST.get('name')
    case = CaseFiles.objects.get(name=name)

    if(os.path.isfile(case.path + "/result" + name + ".html") == True):
        return render(request, case.path + "/result" + name + ".html")
    else:
        return HttpResponse(json.dumps({'statusCode': 'failed'}),
                            content_type="application/json")
