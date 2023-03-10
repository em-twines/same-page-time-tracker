# Generated by Django 4.1.5 on 2023-01-30 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('requests_for_pto', '0009_remove_request_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Frequency',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('frequency1', models.IntegerField(default=365)),
                ('frequency2', models.IntegerField(default=1095)),
                ('frequency3', models.IntegerField(default=1825)),
            ],
        ),
        migrations.CreateModel(
            name='Hours',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hours1', models.IntegerField(default=80)),
                ('hours2', models.IntegerField(default=120)),
                ('hours3', models.IntegerField(default=160)),
            ],
        ),
    ]
