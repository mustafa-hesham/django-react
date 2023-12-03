from django.db import models
from django.utils.timezone import now

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=50, unique=True)
    price = models.DecimalField(decimal_places=2)
    quantity = models.PositiveIntegerField(default=0)
    SKU = models.CharField(max_length=15, unique=True)
    weight = models.DecimalField(decimal_places=2)
    is_available = models.BooleanField(default=True)
    description = models.TextField(max_length=500, blank=True)
    color = models.CharField()
    images = models.ImageField(upload_to="products")
    createdAt = models.DateTimeField(default=now, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def getIsAvailable(self):
        return self.quantity > 0

    def setIsAvailable(self):
        if self.quantity == 0:
            self.is_available = False
        else:
            self.is_available = True
