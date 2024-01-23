from django.db import models
from django.contrib.auth.models import User
from django_countries.fields import CountryField

# Create your models here.

TYPE_ADDRESS_CHOICES = [
    (1, "Billing address"),
    (2, "Shipping address"),
]


class Address(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    country = CountryField()
    state = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    street = models.TextField(max_length=250)
    zipCode = models.CharField(max_length=10)
    address_type = models.PositiveIntegerField(choices=TYPE_ADDRESS_CHOICES)
    is_default = models.BooleanField(default=False)
