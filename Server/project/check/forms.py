from django import forms
from .models import CaseFiles


class UploadFileForm(forms.ModelForm):
    class Meta:
        model = CaseFiles
        fields = ('description', 'document', )
