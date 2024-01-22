from cart.models import Cart, CartItem
from graphene_django import DjangoObjectType
import graphene
from product.types import CategoryInputType, ProductVariantInputType


class CartType(DjangoObjectType):
    class Meta:
        model = Cart
        fields = "__all__"


class CartItemType(DjangoObjectType):
    class Meta:
        model = CartItem
        fields = "__all__"


class CartItemInput(graphene.InputObjectType):
    id = graphene.String()
    SKU = graphene.String()
    description = graphene.String()
    name = graphene.String()
    variants = ProductVariantInputType()
    cartQuantity = graphene.Int()
    quantity = graphene.Int()
    is_available = graphene.Boolean()
    price = graphene.String()
    weight = graphene.String()
    category = CategoryInputType()
