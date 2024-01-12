from graphene_django import DjangoObjectType
from product.models import (
    Product,
    Category,
    ProductImagesItem,
    ProductSize,
    ProductImageColor,
    ProductImage,
)


class ProductType(DjangoObjectType):
    class Meta:
        model = Product
        fields = "__all__"


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = "__all__"


class ProductImagesItemType(DjangoObjectType):
    class Meta:
        model = ProductImagesItem
        fields = "__all__"


class ProductSizeType(DjangoObjectType):
    class Meta:
        model = ProductSize
        fields = "__all__"


class ProductImageColorType(DjangoObjectType):
    class Meta:
        model = ProductImageColor
        fields = "__all__"


class ProductImageType(DjangoObjectType):
    class Meta:
        model = ProductImage
        fields = "__all__"
