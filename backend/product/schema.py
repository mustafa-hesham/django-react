import graphene
from product.types import ProductType, CategoryType
from product.models import Product, Category


class Query(graphene.ObjectType):
    products = graphene.List(ProductType)
    categories = graphene.List(CategoryType)

    def resolve_products(self, info):
        return Product.objects.all()

    def resolve_categories(self, info):
        return Category.objects.all()


schema = graphene.Schema(query=Query)
