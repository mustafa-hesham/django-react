# type: ignore
from email.policy import default
from product.models import Product
from cart.types import CartType, CartItemType, CartItemInput
from cart.models import Cart, CartItem
import graphene
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required


class Query(graphene.ObjectType):
    carts = graphene.List(CartType)
    cart_items = graphene.List(CartItemType)
    cart_by_user = graphene.Field(CartType, user=graphene.String())
    cart_items_by_user = graphene.List(CartItemType, user=graphene.String())

    def resolve_carts(self, info):
        return Cart.objects.all()

    def resolve_cart_items(self, info):
        return CartItem.objects.all()

    def resolve_cart_by_user(self, info, user):
        if not info.context.user.is_authenticated:
            return

        try:
            userObject = User.objects.get(username=user)
            return Cart.objects.get(customer=userObject, isActive=True)
        except Cart.DoesNotExist:
            return None

    @login_required
    def resolve_cart_items_by_user(self, info, user):
        if not info.context.user.is_authenticated:
            return

        try:
            userObject = User.objects.get(username=user)
            cartObject = Cart.objects.get(customer=userObject, isActive=True)
            return CartItem.objects.filter(cart=cartObject, quantity__gt=0)
        except CartItem.DoesNotExist:
            return []


class CreateCartForCustomer(graphene.Mutation):
    class Arguments:
        user = graphene.String(required=True)
        cart_id = graphene.String(required=True)
        cart_items = graphene.List(CartItemInput, required=False)

    customer_cart = graphene.Field(lambda: CartType)

    def mutate(self, info, user, cart_id, cart_items):
        if not info.context.user.is_authenticated:
            return

        try:
            userObject = User.objects.get(username=user)
            cartObject, created = Cart.objects.get_or_create(
                cart_id=cart_id, customer=userObject, isActive=True
            )

            cartItemsObjects = CartItem.objects.filter(cart=cartObject, quantity__gt=0)
            cartItemsIds = []

            for item in cart_items:
                cartItemsIds.append(item.id)

            if cartItemsObjects and len(cartItemsObjects) > len(cartItemsIds):
                for cartItem in cartItemsObjects:
                    if not cartItem.id in cartItemsIds:
                        cartItem.delete()

            if created:
                cartObject.save()

            if cart_items and len(cart_items):
                for item in cart_items:
                    productObject = Product.objects.get(pk=item.id)
                    cartItemObject, cartItemCreated = CartItem.objects.get_or_create(
                        cart=cartObject, product=productObject
                    )

                    if item.cartQuantity <= productObject.quantity:
                        cartItemObject.quantity = item.cartQuantity
                    else:
                        cartItemObject.quantity = productObject.quantity

                    cartItemObject.save()

            cartObject.updateTotal()

            return CreateCartForCustomer(customer_cart=cartObject)
        except CartItem.DoesNotExist:
            return None


class AddProductToCart(graphene.Mutation):
    class Arguments:
        productID = graphene.Int(required=True)
        cartID = graphene.String(required=True)
        quantity = graphene.Int(required=True)

    cartItem = graphene.Field(lambda: CartItemType)

    @login_required
    def mutate(self, info, productID, cartID, quantity):
        try:
            productObject = Product.objects.get(pk=productID)
            cartObject = Cart.objects.get(cart_id=cartID)
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
