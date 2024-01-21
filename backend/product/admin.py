from django.contrib import admin
from .models import (
    Product,
    Category,
    ProductVariantCollection,
    ProductVariant,
    ProductColor,
    ProductSize,
    ProductSingleImage,
    ProductVariantImages,
)

# Register your models here.


class ProductVariantsTabularInline(admin.TabularInline):
    model = ProductVariantCollection
    extra = 1


class ProductVariantImagesTabularInline(admin.TabularInline):
    model = ProductVariantImages
    extra = 1


class ProductVariantAdmin(admin.ModelAdmin):
    inlines = [ProductVariantImagesTabularInline]


class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductVariantsTabularInline]

    class Meta:
        model: Product


class ProductColorAdmin(admin.ModelAdmin):
    list_display = ["colored_name"]


admin.site.register(ProductSize)
admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
admin.site.register(ProductVariant, ProductVariantAdmin)
admin.site.register(ProductColor, ProductColorAdmin)
admin.site.register(ProductSingleImage)
