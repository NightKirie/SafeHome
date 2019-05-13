# from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage
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
    name = request.POST.get('name')
    uploadFiles = request.FILES.getlist('file')

    fs = FileSystemStorage()
    path = os.path.abspath('.') + "/uploads"
    destination = os.path.abspath('.') + "/check/casefiles/case" + name

    for f in uploadFiles:
        if f.name.endswith('.html'):
            fs.save('result'+name+'.html', f)
        else:
            fs.save(f.name, f)

    for f in os.listdir(path):
        shutil.move(path + "/" + f, destination)

    Case.objects.filter(name=name).update(checked=1)

    return HttpResponse(json.dumps({'statusCode': 'success'}),
                        content_type="application/json")

@group_required('Volunteer', 'Engineer')
def result(request):
    name = request.POST.get('name')
    case = CaseFiles.objects.get(name=name)

    if(os.path.isfile(case.path + "/result" + name + ".html") == True):
        return render(request, case.path + "/result" + name + ".html")
    else:
        return HttpResponse(json.dumps({'statusCode': 'failed'}),
                            content_type="application/json")
