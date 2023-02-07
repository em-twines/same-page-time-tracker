# Generated by Django 4.1.5 on 2023-02-07 12:50

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('requests_for_pto', '0012_request_submission_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='request',
            name='submission_time',
            field=models.DateTimeField(default=datetime.datetime.now, verbose_name='%m/%d/%y %H:%M'),
        ),
    ]
