# Generated by Django 3.0.5 on 2020-05-28 07:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tools', '0011_auto_20200528_1237'),
    ]

    operations = [
        migrations.AlterField(
            model_name='request',
            name='colour_code',
            field=models.CharField(max_length=10, null=True),
        ),
    ]
