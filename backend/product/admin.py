from django.contrib import admin
from .models import (
    Product,
    Category,
    ProductVariant,
    ProductImage,
    ProductImageColor,
    ProductSize,
)

# Register your models here.


class ProductImagesTabularInline(admin.TabularInline):
    model = ProductVariant
    extra = 1


class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImagesTabularInline]

    class Meta:
        model: Product


class ProductImageColorAdmin(admin.ModelAdmin):
    list_display = ["colored_name"]


admin.site.register(ProductSize)
admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
admin.site.register(ProductImage)
admin.site.register(ProductImageColor, ProductImageColorAdmin)
