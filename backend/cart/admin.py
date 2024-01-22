from django.contrib import admin
from cart.models import Cart, CartItem

# Register your models here.


class CartItemAdmin(admin.ModelAdmin):
    readonly_fields = ["productColor", "productSize", "productVariantId"]


admin.site.register(Cart)
admin.site.register(CartItem, CartItemAdmin)
