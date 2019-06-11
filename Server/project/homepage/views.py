from django.shortcuts import render
from django.http import HttpResponse
from authentication.views import group_required

import json
# Create your views here.


@group_required('House', 'Volunteer', 'Engineer')
def welcome(request):
#    response = "Hi! " + request.user.last_name + request.user.first_name
    response = '<p id="success">' + request.user.groups.all()[0].name + '</p>'
    return HttpResponse(response)


def seeya(request):
    response = '<p id="success">see ya!</p>'
    return HttpResponse(response)


def denied(request):
    response = '<ul class="failed"><li>failed</li></ul>'
    return HttpResponse(response)


def permissionD(request):
    return HttpResponse(json.dumps({'statusCode': 'permission denied.'}),
                        content_type="application/json")
