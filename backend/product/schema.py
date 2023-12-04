import graphene
from graphene_django import DjangoObjectType
from product.models import Product, Category


class ProductType(DjangoObjectType):
    class Meta:
        model = Product
        fields = "__all__"


class Query(graphene.ObjectType):
    products = graphene.List(ProductType)

    def resolve_products(self, info):
        return Product.objects.all()


schema = graphene.Schema(query=Query)
