from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User
from datetime import timedelta

from product.models import Product

# Create your models here.


class Cart(models.Model):
    cart_id = models.CharField(max_length=40, default="")
    customer = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    email = models.EmailField(null=True, blank=True, max_length=254)
    createdAt = models.DateTimeField(default=now, blank=True)
    subtotal = models.DecimalField(max_digits=100, decimal_places=2)
    total = models.DecimalField(max_digits=100, decimal_places=2)
    tax = models.DecimalField(max_digits=100, decimal_places=2)
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.customer

    def abandonedCart(self):
        return now() - self.createdAt > timedelta(days=1) and self.isActive

    def getEmailFromUser(self):
        self.email = User.email

    def isCartHasItems(self):
        return self.subtotal > 0

    def updateTotal(self):
        cartItems = CartItem.objects.filter(cart=self)
        if cartItems and len(cartItems):
            for item in cartItems:
                self.total += item.product.price * item.quantity


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = quantity = models.PositiveIntegerField(default=0)
