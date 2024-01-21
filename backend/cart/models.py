from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User
from datetime import timedelta

from product.models import Product, ProductSize, ProductColor

# Create your models here.


class Cart(models.Model):
    cart_id = models.CharField(max_length=40, default="")
    customer = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    email = models.EmailField(null=True, blank=True, max_length=254)
    createdAt = models.DateTimeField(default=now, blank=True)
    subtotal = models.DecimalField(
        max_digits=100, decimal_places=2, null=True, blank=True
    )
    total = models.DecimalField(max_digits=100, decimal_places=2, null=True, blank=True, default=0.00)  # type: ignore
    tax = models.DecimalField(max_digits=100, decimal_places=2, null=True, blank=True)
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.cart_id[0:10]

    def abandonedCart(self):
        return now() - self.createdAt > timedelta(days=1) and self.isActive

    def setEmailForCart(self, email):
        self.email = email
        self.save()

    def isCartHasItems(self):
        return self.total > 0

    def updateTotal(self):
        self.total = 0
        self.save()
        cartItems = CartItem.objects.filter(cart=self)
        if cartItems and len(cartItems):
            for item in cartItems:
                self.total += item.product.price * item.quantity
                self.save()


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = quantity = models.PositiveIntegerField(default=0)
    productVariantId = models.PositiveIntegerField(default=0)
    productColor = models.ForeignKey(ProductColor, on_delete=models.CASCADE)
    productSize = models.ForeignKey(ProductSize, on_delete=models.CASCADE)

    def __str__(self):
        return (
            str(self.cart)
            + " "
            + self.product.name
            + " "
            + str(self.product.variants.get(pk=self.productVariantId).color.name)
        )

    def setProductSize(self, size):
        self.size = size
        self.save()

    def setProductColor(self, color):
        self.color = color
        self.save()
