from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.forms import UserCreationForm

import json
# Create your views here.


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        print("Errors", form.errors)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect("/accounts/login")
        else:
            return HttpResponse(json.dumps({'statusCode': 'success'}),
                                content_type="application/json")
    else:
        form = UserCreationForm()
        return render(request, "registration/register.html", {'form': form})
