from django.shortcuts import render
from django.http import HttpResponse
from authentication.views import group_required

# Create your views here.


@group_required('House', 'Volunteer')
def welcome(request):
    response = "Hi! " + request.user.last_name + request.user.first_name
    return HttpResponse(response)
