from pyexpat import model
from graphene_django import DjangoObjectType
import graphene

from product.models import (
    Product,
    Category,
    ProductVariantCollection,
    ProductSize,
    ProductColor,
    ProductVariant,
    ProductSingleImage,
    ProductSizeCollection,
)


class ProductType(DjangoObjectType):
    class Meta:
        model = Product
        fields = "__all__"


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = "__all__"


class ProductVariantCollectionType(DjangoObjectType):
    class Meta:
        model = ProductVariantCollection
        fields = "__all__"


class ProductSizeType(DjangoObjectType):
    class Meta:
        model = ProductSize
        fields = "__all__"


class ProductSizeCollectionType(DjangoObjectType):
    class Meta:
        model = ProductSizeCollection
        fields = "__all__"


class ProductColorType(DjangoObjectType):
    class Meta:
        model = ProductColor
        fields = "__all__"


class ProductVariantType(DjangoObjectType):
    class Meta:
        model = ProductVariant
        fields = "__all__"


class ProductSingleImageType(DjangoObjectType):
    class Meta:
        model = ProductSingleImage
        fields = "__all__"


class ProductSizeInputType(graphene.InputObjectType):
    name = graphene.String()


class ProductColorInputType(graphene.InputObjectType):
    name = graphene.String()
    hexValue = graphene.String()


class ProductSingleImageInputType(graphene.InputObjectType):
    image = graphene.String()


class ProductVariantOrderInputType(graphene.InputObjectType):
    order = graphene.Int()


class ProductSizeCollectionInputType(graphene.InputObjectType):
    size = ProductSizeInputType()
    quantity = graphene.Int()


class ProductVariantInputType(graphene.InputObjectType):
    id = graphene.String()
    images = graphene.List(ProductSingleImageInputType)
    quantity = graphene.Int()
    color = ProductColorInputType()
    sizes = graphene.List(ProductSizeInputType)
    productvariantcollection = ProductVariantOrderInputType()
    productsizecollectionSet = ProductSizeCollectionInputType()


class CategoryInputType(graphene.InputObjectType):
    name = graphene.String()
