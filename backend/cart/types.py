from cart.models import Cart, CartItem
from graphene_django import DjangoObjectType


class CartType(DjangoObjectType):
    class Meta:
        model = Cart
        fields = "__all__"


class CartItemType(DjangoObjectType):
    class Meta:
        model = CartItem
        fields = "__all__"
