# Generated by Django 2.2.6 on 2020-02-18 20:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('BasicBusinessManager', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='sallers',
            new_name='sellers',
        ),
    ]
