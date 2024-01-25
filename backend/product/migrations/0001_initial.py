# Generated by Django 4.2.7 on 2024-01-25 12:01

import colorfield.fields
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
            options={
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('quantity', models.PositiveIntegerField(default=0)),
                ('SKU', models.CharField(max_length=15, unique=True)),
                ('weight', models.DecimalField(decimal_places=2, max_digits=10)),
                ('is_available', models.BooleanField(default=True)),
                ('description', models.TextField(blank=True, max_length=500)),
                ('createdAt', models.DateTimeField(blank=True, default=django.utils.timezone.now)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.category')),
            ],
        ),
        migrations.CreateModel(
            name='ProductColor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('hexValue', colorfield.fields.ColorField(default='#000', editable=False, image_field=None, max_length=25, samples=None)),
            ],
        ),
        migrations.CreateModel(
            name='ProductSingleImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/products/')),
            ],
        ),
        migrations.CreateModel(
            name='ProductSize',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductSizeCollection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=0)),
                ('size', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.productsize')),
            ],
        ),
        migrations.CreateModel(
            name='ProductVariant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=0)),
                ('color', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.productcolor')),
            ],
            options={
                'ordering': ['productvariantcollection__order'],
            },
        ),
        migrations.CreateModel(
            name='ProductVariantImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=1)),
                ('image', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='product.productsingleimage')),
                ('variant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.productvariant')),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='ProductVariantCollection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(default=1)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product')),
                ('variant', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='product.productvariant')),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.AddField(
            model_name='productvariant',
            name='images',
            field=models.ManyToManyField(related_name='product_variant_images', through='product.ProductVariantImages', to='product.productsingleimage'),
        ),
        migrations.AddField(
            model_name='productvariant',
            name='sizes',
            field=models.ManyToManyField(related_name='product_variant_sizes', through='product.ProductSizeCollection', to='product.productsize'),
        ),
        migrations.AddField(
            model_name='productsizecollection',
            name='variant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.productvariant'),
        ),
        migrations.AddField(
            model_name='product',
            name='variants',
            field=models.ManyToManyField(related_name='product_variant', through='product.ProductVariantCollection', to='product.productvariant'),
        ),
    ]
