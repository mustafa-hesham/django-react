from colorfield.fields import ColorField
from django.db import models
from django.utils.timezone import now
from django.utils.html import format_html


class Category(models.Model):
    class Meta:
        verbose_name_plural = "Categories"

    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class ProductImageColor(models.Model):
    name = models.CharField(max_length=50, unique=True)
    hexValue = ColorField(default="#000", editable=False)

    def __str__(self):
        return self.colored_name()

    def colored_name(self):
        return format_html(
            '<span style="display: flex;"><div>{}</div><div style="background-color: {}; width: 25px; height: 15px; margin-block: auto; margin-inline-start: 5px;"></div></span>',
            self.name,
            self.hexValue,
        )


class ProductSize(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    image = models.ImageField(upload_to="images/products/")
    color = models.ForeignKey(ProductImageColor, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    size = models.ManyToManyField(ProductSize)

    def __str__(self):
        return self.color.name


class Product(models.Model):
    name = models.CharField(max_length=50, unique=True)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    quantity = models.PositiveIntegerField(default=0)
    SKU = models.CharField(max_length=15, unique=True)
    weight = models.DecimalField(decimal_places=2, max_digits=10)
    is_available = models.BooleanField(default=True)
    description = models.TextField(max_length=500, blank=True)
    images = models.ManyToManyField(
        ProductImage, through="ProductImagesItem", related_name="product_images_item"
    )
    createdAt = models.DateTimeField(default=now, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def getIsAvailable(self):
        return self.quantity > 0

    def setIsAvailable(self):
        self.is_available = self.getIsAvailable()


class ProductImagesItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.OneToOneField(ProductImage, on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=1)
