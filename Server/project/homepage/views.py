from django.shortcuts import render
from django.http import HttpResponse
from authentication.views import group_required

# Create your views here.


# @group_required('House', 'Volunteer', 'Engineer')
def welcome(request):
#    response = "Hi! " + request.user.last_name + request.user.first_name
    if request.user.groups.all().count():
        response = '<p class="success" id="success">' + request.user.groups.all()[0].name + '</p>'
        return HttpResponse(response)
    else:
        return HttpResponse('<p class="error" id="anonymous">anonymous user</p>')


def seeya(request):
    response = '<p class="success" id="success">see ya!</p>'
    return HttpResponse(response)


def denied(request):
    response = '<ul class="failed"><li>failed</li></ul>'
    return HttpResponse(response)


def permissionD(request):
    response = '<p class="error" id="permission">permission denied</p>'
    return HttpResponse(response)
