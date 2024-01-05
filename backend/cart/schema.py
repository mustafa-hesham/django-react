# type: ignore
from product.models import Product
from cart.types import CartType, CartItemType, CartItemInput
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
        try:
            userObject = User.objects.get(username=user)
            return Cart.objects.get(user=userObject, isActive=True)
        except CartItem.DoesNotExist:
            return None

    def resolve_cart_items_by_user(self, info, user):
        try:
            userObject = User.objects.get(username=user)
            cartObject = Cart.objects.get(user=userObject, isActive=True)
            cartItems = CartItem.objects.filter(cart=cartObject)
            return [cartObject, cartItems]
        except CartItem.DoesNotExist:
            return None


class CreateCartForCustomer(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        cart_id = graphene.String(required=True)
        cart_items = graphene.List(CartItemInput)

    customer_cart = graphene.Field(lambda: CartType)

    def mutate(self, info, username, cart_id, cart_items):
        userObject = User.objects.get(username=username)
        newCartObject = Cart(User=userObject, cart_id=cart_id).save()
        if cart_items and len(cart_items):
            for item in cart_items:
                productObject = Product.objects.get(pk=item.id)
                CartItem(
                    Cart=newCartObject,
                    product=productObject,
                    quantity=item.cartQuantity,
                ).save()

        newCartObject.updateTotal()

        return CreateCartForCustomer(customer_cart=newCartObject)


class AddProductToCart(graphene.Mutation):
    class Arguments:
        productID = graphene.Int(required=True)
        cartID = graphene.String(required=True)
        quantity = graphene.Int(required=True)

    cartItem = graphene.Field(lambda: CartItemType)

    def mutate(self, info, productID, cartID, quantity):
        try:
            productObject = Product.objects.get(pk=productID)
            cartObject = Cart.objects.get(pk=cartID)
            addedCartItem = CartItem.objects.get(cart=cartObject, product=productObject)
            if addedCartItem:
                addedCartItem.quantity += quantity
                addedCartItem.save()
                cartObject.updateTotal()
                return AddProductToCart(cartItem=addedCartItem)
            else:
                newCartItem = CartItem(
                    product=productObject, cart=cartObject, quantity=quantity
                ).save()
                cartObject.updateTotal()
                return AddProductToCart(cartItem=newCartItem)
        except Cart.DoesNotExist:
            return None


class Mutation(graphene.ObjectType):
    add_product_to_cart = AddProductToCart.Field()
    create_cart_for_customer = CreateCartForCustomer.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
