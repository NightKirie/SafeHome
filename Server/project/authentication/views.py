from django.contrib import auth
from django.contrib.auth.models import User
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


# will be removed
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


# will be removed
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

    return user_passes_test(in_groups, login_url='/home/permissiondenied/',
                            redirect_field_name=None)


def loginHome(request):
    return render(request, 'registration/login.html')


def login(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect('/home/welcome/')

    username = request.POST.get('username')
    password = request.POST.get('password')

    if not username or not password:
        return HttpResponse('<p id="nullInputError">null input</p>')
    else:
        user = auth.authenticate(username=username, password=password)
        if user!=None:
            if user.is_active:
                auth.login(request, user)
                return HttpResponseRedirect('/home/welcome/')
            else:
                return HttpResponse('<p id="inactiveUserError">inactive user</p>')
        else:
            return HttpResponse('<p id="non-existUserError">user not found</p>')


def logout(request):
    auth.logout(request)
    return HttpResponseRedirect('/home/seeya/')
