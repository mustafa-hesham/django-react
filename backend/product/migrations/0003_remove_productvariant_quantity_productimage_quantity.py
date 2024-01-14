# Generated by Django 4.2.7 on 2024-01-14 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_remove_productimage_quantity_productvariant_quantity'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='productvariant',
            name='quantity',
        ),
        migrations.AddField(
            model_name='productimage',
            name='quantity',
            field=models.PositiveIntegerField(default=1),
        ),
    ]