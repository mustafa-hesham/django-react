# Generated by Django 4.2.7 on 2024-01-12 13:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cart_id', models.CharField(default='', max_length=40)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('createdAt', models.DateTimeField(blank=True, default=django.utils.timezone.now)),
                ('subtotal', models.DecimalField(blank=True, decimal_places=2, max_digits=100, null=True)),
                ('total', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=100, null=True)),
                ('tax', models.DecimalField(blank=True, decimal_places=2, max_digits=100, null=True)),
                ('isActive', models.BooleanField(default=True)),
                ('customer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CartItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=0)),
                ('cart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cart.cart')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product')),
            ],
        ),
    ]
