# Generated by Django 2.2 on 2019-05-10 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apply', '0009_case_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='case',
            name='address',
            field=models.CharField(max_length=100),
        ),
    ]
