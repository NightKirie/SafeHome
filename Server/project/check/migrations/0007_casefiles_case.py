# Generated by Django 2.2 on 2019-05-09 03:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('apply', '0001_initial'),
        ('check', '0006_auto_20190509_1056'),
    ]

    operations = [
        migrations.AddField(
            model_name='casefiles',
            name='case',
            field=models.OneToOneField(default='none', on_delete=django.db.models.deletion.CASCADE, to='apply.Case'),
        ),
    ]
