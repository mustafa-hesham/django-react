from product.models import Product
from cart.types import CartType, CartItemType
from cart.models import Cart, CartItem
import graphene
from django.contrib.auth.models import User


class Query(graphene.ObjectType):
    carts = graphene.List(CartType)
    cart_items = graphene.List(CartItemType)
    cart_by_user = graphene.List(CartType, user=graphene.String())
    cart_items_by_user = graphene.List(CartItemType, user=graphene.String())

    def resolve_carts(self, info):
        return Cart.objects.all()

    def resolve_cart_items(self, info):
        return CartItem.objects.all()

    def resolve_cart_by_user(self, info, user):
        if info.context.user.is_authenticated:
            try:
                userObject = User.objects.get(username=user)
                return Cart.objects.get(user=userObject, isActive=True)
            except CartItem.DoesNotExist:
                return None
        else:
            return None

    def resolve_cart_items_by_user(self, info, user):
        if info.context.user.is_authenticated:
            try:
                userObject = User.objects.get(username=user)
                cartObject = Cart.objects.get(user=userObject, isActive=True)
                cartItems = CartItem.objects.filter(cart=cartObject)
                return [cartObject, cartItems]
            except CartItem.DoesNotExist:
                return None
        else:
            return None


class AddProductToCart(graphene.Mutation):
    class Arguments:
        productID = graphene.Int(required=True)
        cartID = graphene.Int(required=True)
        quantity = graphene.Int(required=True)

    cartItem = graphene.Field(lambda: CartItemType)

    def mutate(self, info, productID, cartID, quantity):
        if info.context.user.is_authenticated:
            try:
                productObject = Product.objects.get(pk=productID)
                cartObject = Cart.objects.get(pk=cartID)
                newCartItem = CartItem(
                    product=productObject, cart=cartObject, quantity=quantity
                ).save()
                return AddProductToCart(cartItem=newCartItem)  # type: ignore
            except Cart.DoesNotExist:
                return None
        else:
            return None


class Mutation(graphene.ObjectType):
    add_product_to_cart = AddProductToCart.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
