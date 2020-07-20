# Generated by Django 3.0.5 on 2020-07-19 14:55

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('tools', '0040_auto_20200716_2133'),
    ]

    operations = [
        migrations.AddField(
            model_name='request',
            name='issued_time',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='request',
            name='returned_time',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
