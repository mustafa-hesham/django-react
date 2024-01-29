from django.db import models
from django_countries.fields import CountryField
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.utils.timezone import now
from django.core.validators import RegexValidator
import datetime
from django.core.exceptions import ValidationError
from product.models import Product

alphaField = RegexValidator(r"[a-zA-Z\s\-\']+", "Enter a valid name")

emailField = RegexValidator(
    r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
    "Enter a valid email",
)

usernameField = RegexValidator(r"[a-zA-Z][a-zA-Z0-9_\.-]+", "Enter a valid username")


# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError("Users must have an email address.")
        if not password:
            raise ValueError("Users must have a password.")

        user_obj = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )
        user_obj.active = True
        user_obj.is_admin = False
        user_obj.date_joined = now()
        user_obj.set_password(password)
        user_obj.save(using=self._db)
        return user_obj

    def create_superuser(self, email, password, first_name, last_name):
        user_obj = self.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        user_obj.is_admin = True
        user_obj.is_superuser = True
        user_obj.is_staff = True
        user_obj.is_active = True
        user_obj.save(using=self._db)
        return user_obj


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.CharField(
        verbose_name="email address",
        unique=True,
        error_messages={"unique": "Email already registered"},
        max_length=254,
        validators=[emailField],
    )
    first_name = models.CharField(
        max_length=20,
        validators=[
            alphaField,
        ],
    )
    last_name = models.CharField(
        max_length=20,
        validators=[
            alphaField,
        ],
    )
    birth_date = models.DateField(blank=True, null=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]
    objects = CustomUserManager()

    def __str__(self):
        return self.first_name + " " + self.last_name

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin

    def save(self, *args, **kwargs):
        if self.birth_date and self.birth_date > datetime.date.today():
            raise ValidationError("The birth date cannot be a future date")
        super(CustomUser, self).save(*args, **kwargs)


TYPE_ADDRESS_CHOICES = [
    (1, "Billing address"),
    (2, "Shipping address"),
]


class Address(models.Model):
    class Meta:
        verbose_name_plural = "Addresses"

    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    country = CountryField()
    state = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    street = models.TextField(max_length=250)
    zipCode = models.CharField(max_length=10)
    address_type = models.PositiveIntegerField(choices=TYPE_ADDRESS_CHOICES)
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return self.country

    def isBillingAddress(self):
        return self.address_type == 1

    def isShippingAddress(self):
        return self.address_type == 2


class Favorite(models.Model):
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
