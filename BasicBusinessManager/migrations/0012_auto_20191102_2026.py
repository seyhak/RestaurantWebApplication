# Generated by Django 2.2.6 on 2019-11-02 19:26

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('BasicBusinessManager', '0011_auto_20191102_1414'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='birthday',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
