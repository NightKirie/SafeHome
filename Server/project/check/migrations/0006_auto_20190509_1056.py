# Generated by Django 2.2 on 2019-05-09 02:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('check', '0005_remove_casefiles_case'),
    ]

    operations = [
        migrations.AlterField(
            model_name='casefiles',
            name='path',
            field=models.FileField(default='0', upload_to=''),
        ),
    ]