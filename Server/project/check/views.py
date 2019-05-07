from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from .models import CaseFiles

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

    if(os.path.isdir(destination) == False):
        os.mkdir(destination)
        CaseFiles.objects.create(name=request.POST.get('name'),
                                 path=destination)

    for f in uploadFiles:
        fs.save(f.name, f)

    for f in os.listdir(path):
        shutil.move(path+"/"+f, destination)
    return HttpResponse(json.dumps({'statusCode': 'success'}),
                        content_type="application/json")


def result(request):
    name = request.POST.get('name')
    path = os.path.abspath('.') + "/check/casefiles/case" + name + "/result" + name + ".html"

    if(os.path.isfile(path)):
        return render(request, path)
    else:
        return HttpResponse(json.dumps({'statusCode': 'failed'}),
                            content_type="application/json")
