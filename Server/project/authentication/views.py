from django.contrib.auth.decorators import user_passes_test
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.forms import UserCreationForm
from .forms import HouseUserCreationForm, VolunteerUserCreationForm, EngineerUserCreationForm

import json
# Create your views here.


def houseRegister(request):
    if request.method == 'POST':
        form = HouseUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect("/accounts/login")
        else:
            return HttpResponse(json.dumps(form.errors),
                                content_type="application/json")
    else:
        form = HouseUserCreationForm()
        return render(request, "registration/register.html", {'form': form})


def volunteerRegister(request):
    if request.method == 'POST':
        form = VolunteerUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect("/accounts/login")
        else:
            return HttpResponse(json.dumps(form.errors),
                                content_type="application/json")
    else:
        form = HouseUserCreationForm()
        return render(request, "registration/register.html", {'form': form})


def engineerRegister(request):
    if request.method == 'POST':
        form = EngineerUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect("/accounts/login")
        else:
            return HttpResponse(json.dumps(form.errors),
                                content_type="application/json")
    else:
        form = HouseUserCreationForm()
        return render(request, "registration/register.html", {'form': form})


def group_required(*group_names):
    def in_groups(user):
        if user.is_authenticated:
            if bool(user.groups.filter(name__in=group_names)) | user.is_superuser:
                return True
        return False

    return user_passes_test(in_groups, login_url='/accounts/login')
