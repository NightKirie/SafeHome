from django.shortcuts import render
from django.http import HttpResponse
from authentication.views import group_required

import json
# Create your views here.


@group_required('House', 'Volunteer')
def welcome(request):
    response = "Hi! " + request.user.last_name + request.user.first_name
    return HttpResponse(response)


def seeya(request):
    response = "See ya!"
    return HttpResponse(response)


def permissionD(request):
    return HttpResponse(json.dumps({'statusCode': 'permission denied.'}),
                        content_type="application/json")
