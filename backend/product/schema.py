import graphene
from product.types import (
    ProductType,
    CategoryType,
    ProductVariantType,
    ProductVariantType,
)
from product.models import Product, Category, ProductVariantCollection, ProductVariant
import graphql_jwt


class Query(graphene.ObjectType):
    products = graphene.List(ProductType)
    categories = graphene.List(CategoryType)
    products_by_category = graphene.List(ProductType, category=graphene.String())
    products_items = graphene.List(ProductVariantType)
    product_variants = graphene.List(ProductVariantType)
    product_by_sku = graphene.Field(ProductType, sku=graphene.String(required=True))

    def resolve_products(self, info):
        return Product.objects.all()

    def resolve_categories(self, info):
        return Category.objects.all()

    def resolve_products_by_category(self, info, category):
        try:
            categoryId = Category.objects.get(name=category).pk
            return Product.objects.filter(category=categoryId)
        except Product.DoesNotExist:
            return None

    def resolve_products_items(self, info):
        return ProductVariantCollection.objects.all()

    def resolve_product_variants(self, info):
        return ProductVariant.objects.all()

    def resolve_product_by_sku(self, info, sku):
        return Product.objects.get(SKU=sku)


class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
