from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User, Group
from django import forms
from django.core.exceptions import ValidationError


class HouseUserCreationForm(forms.Form):
    username = forms.CharField(label='Enter username', max_length=20)
#    email = forms.EmailField(label='Enter email')
    name = forms.CharField(label='Enter name', max_length=10)
    # saving name into firstName field
#    lastName = forms.CharField(label='Enter last name', max_length=10)
    password = forms.CharField(label='Enter password', widget=forms.PasswordInput)
#    password2 = forms.CharField(label='Confirm password', widget=forms.PasswordInput)

    def clean_username(self):
        username = self.cleaned_data['username'].lower()
        r = User.objects.filter(username=username)
        if r.count():
            raise ValidationError("User already exists.")
        else:
            return username

#    def clean_email(self):
#        email = self.cleaned_data['email'].lower()
#        r = User.objects.filter(email=email)
#        if r.count():
#            raise ValidationError("Email already exists")
#        return email

    def clean_firstName(self):
        firstName = self.cleaned_data['name']
        return firstName

 #   def clean_lastName(self):
#        lastName = self.cleaned_data['lastName']
#        return lastName

#    def clean_password2(self):
#        password1 = self.cleaned_data.get('password1')
#        password2 = self.cleaned_data.get('password2')

#        if password1 and password2 and password1 != password2:
#            raise ValidationError("Password don't match")

#        return password2

    def save(self, commit=True):
        user = User.objects.create_user(
            self.cleaned_data['username'],
            'none@mail.com',
            self.cleaned_data['password']
        )
        user.first_name = self.cleaned_data['name']
#        user.last_name = self.cleaned_data['lastName']
        user.save()

        group = Group.objects.get(name="HouseOwner")
        group.user_set.add(user)
        return user

# will be removed
class VolunteerUserCreationForm(forms.Form):
    username = forms.CharField(label='Enter username', min_length=4, max_length=20)
#    email = forms.EmailField(label='Enter email')
    firstName = forms.CharField(label='Enter first name', max_length=10)
    lastName = forms.CharField(label='Enter last name', max_length=10)
    password1 = forms.CharField(label='Enter password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirm password', widget=forms.PasswordInput)

    def clean_username(self):
        username = self.cleaned_data['username'].lower()
        r = User.objects.filter(username=username)
        if r.count():
            raise ValidationError("Username already exists.")
        return username

#    def clean_email(self):
#        email = self.cleaned_data['email'].lower()
#        r = User.objects.filter(email=email)
#        if r.count():
#            raise ValidationError("Email already exists")
#        return email

    def clean_firstName(self):
        firstName = self.cleaned_data['firstName']
        return firstName

    def clean_lastName(self):
        lastName = self.cleaned_data['lastName']
        return lastName

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')

        if password1 and password2 and password1 != password2:
            raise ValidationError("Password don't match")

        return password2

    def save(self, commit=True):
#        self.cleaned_data['email']
        user = User.objects.create_user(
            self.cleaned_data['username'],
            'none@mail.com',
            self.cleaned_data['password1']
        )
        user.first_name = self.cleaned_data['firstName']
        user.last_name = self.cleaned_data['lastName']
        user.save()

        group = Group.objects.get(name="Volunteer")
        group.user_set.add(user)
        return user

# will be removed
class EngineerUserCreationForm(forms.Form):
    username = forms.CharField(label='Enter username', min_length=4, max_length=20)
#    email = forms.EmailField(label='Enter email')
    firstName = forms.CharField(label='Enter first name', max_length=10)
    lastName = forms.CharField(label='Enter last name', max_length=10)
    password1 = forms.CharField(label='Enter password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirm password', widget=forms.PasswordInput)

    def clean_username(self):
        username = self.cleaned_data['username'].lower()
        r = User.objects.filter(username=username)
        if r.count():
            raise ValidationError("Username already exists")
        return username

#    def clean_email(self):
#        email = self.cleaned_data['email'].lower()
#        r = User.objects.filter(email=email)
#        if r.count():
#            raise ValidationError("Email already exists")
#        return email

    def clean_firstName(self):
        firstName = self.cleaned_data['firstName']
        return firstName

    def clean_lastName(self):
        lastName = self.cleaned_data['lastName']
        return lastName

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')

        if password1 and password2 and password1 != password2:
            raise ValidationError("Password don't match")

        return password2

    def save(self, commit=True):
        user = User.objects.create_user(
            self.cleaned_data['username'],
            'none@mail.com',
            self.cleaned_data['password1']
        )
        user.first_name = self.cleaned_data['firstName']
        user.last_name = self.cleaned_data['lastName']
        user.save()

        group = Group.objects.get(name="Engineer")
        group.user_set.add(user)
        return user
