import graphene
from product.types import (
    ProductType,
    CategoryType,
    ProductImagesItemType,
    ProductImageType,
)
from product.models import Product, Category, ProductImagesItem, ProductImage
import graphql_jwt


class Query(graphene.ObjectType):
    products = graphene.List(ProductType)
    categories = graphene.List(CategoryType)
    products_by_category = graphene.List(ProductType, category=graphene.String())
    products_items = graphene.List(ProductImagesItemType)
    product_images = graphene.List(ProductImageType)

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
        return ProductImagesItem.objects.all()

    def resolve_product_images(self, info):
        return ProductImage.objects.all()


class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
