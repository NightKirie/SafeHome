# Generated by Django 2.2 on 2019-05-14 02:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apply', '0012_auto_20190514_1051'),
    ]

    operations = [
        migrations.RenameField(
            model_name='case',
            old_name='TWID',
            new_name='TwID',
        ),
    ]
