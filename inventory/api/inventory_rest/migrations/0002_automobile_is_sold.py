# Generated by Django 4.0.3 on 2022-08-03 00:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory_rest', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobile',
            name='is_sold',
            field=models.BooleanField(default=False),
        ),
    ]
