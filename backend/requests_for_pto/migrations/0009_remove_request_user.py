# Generated by Django 4.1.5 on 2023-01-20 21:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('requests_for_pto', '0008_request_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='request',
            name='user',
        ),
    ]