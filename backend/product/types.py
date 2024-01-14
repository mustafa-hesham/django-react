from graphene_django import DjangoObjectType
import graphene

from product.models import (
    Product,
    Category,
    ProductVariant,
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


class ProductVariantType(DjangoObjectType):
    class Meta:
        model = ProductVariant
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


class ProductSizeInputType(graphene.InputObjectType):
    name = graphene.String()


class ProductColorInputType(graphene.InputObjectType):
    name = graphene.String()
    hexValue = graphene.String()


class ProductVariantOrderInputType(graphene.InputObjectType):
    order = graphene.Int()


class ProductVariantInputType(graphene.InputObjectType):
    id = graphene.String()
    image = graphene.String()
    quantity = graphene.Int()
    color = ProductColorInputType()
    size = ProductSizeInputType()
    productvariant = ProductVariantOrderInputType()
