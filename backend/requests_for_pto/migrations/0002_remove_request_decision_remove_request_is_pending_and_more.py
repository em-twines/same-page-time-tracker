# Generated by Django 4.1.5 on 2023-01-18 21:17

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('requests_for_pto', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='request',
            name='decision',
        ),
        migrations.RemoveField(
            model_name='request',
            name='is_pending',
        ),
        migrations.AddField(
            model_name='request',
            name='users',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
