# Generated by Django 3.0.5 on 2020-05-21 07:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tools', '0003_order_orderproduct'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='display',
            field=models.BooleanField(default=False),
        ),
    ]