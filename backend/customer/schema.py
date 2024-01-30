# type: ignore
import graphene
from graphql import GraphQLError
from customer.types import CustomerType, FavoriteType
from customer.models import CustomUser, CustomUserManager, Favorite
import re
from datetime import date
from graphql_jwt.decorators import login_required
from product.models import Product


class Query(graphene.ObjectType):
    get_customer_favorites = graphene.List(
        FavoriteType, customer_email=graphene.String(required=True)
    )

    # @login_required
    def resolve_get_customer_favorites(self, info, customer_email):
        customerObject = CustomUser.objects.get(email=customer_email)

        if not customerObject:
            raise GraphQLError("Customer does not exist.")

        return Favorite.objects.get(customer=customerObject)


class CreateCustomer(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        password = graphene.String(required=True)
        password2 = graphene.String(required=True)
        birth_date = graphene.String(required=False)

    customer = graphene.Field(lambda: CustomerType)

    def mutate(
        self, info, email, first_name, last_name, password, password2, birth_date=None
    ):
        if password != password2:
            raise GraphQLError("Password and confirm password does not match.")

        emailPattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        normalizedEmail = CustomUserManager.normalize_email(email)
        birth_date_obj = None

        if birth_date:
            splitted_birth_date = birth_date.split("-")
            birth_date_obj = date(
                int(splitted_birth_date[0]),
                int(splitted_birth_date[1]),
                int(splitted_birth_date[2]),
            )

            if birth_date_obj == date(1971, 1, 1):
                birth_date_obj = None

        if not re.match(emailPattern, normalizedEmail):
            raise GraphQLError("Enter a valid email address.")

        newCustomer, created = CustomUser.objects.get_or_create(
            email=normalizedEmail,
            first_name=first_name,
            last_name=last_name,
            birth_date=birth_date_obj,
        )
        if created:
            newCustomer.set_password(password)
            newCustomer.save()
            return CreateCustomer(customer=newCustomer)
        elif not created:
            raise GraphQLError("Customer already created.")
        else:
            raise GraphQLError("Non specific error occurred.")


class AddProductToFavorites(graphene.Mutation):
    class Arguments:
        SKU = graphene.String(required=True)
        customer_email = graphene.String(required=True)

    favorite_product = graphene.Field(lambda: FavoriteType)

    @login_required
    def mutate(self, info, SKU, customer_email):
        productObject = Product.objects.get(SKU=SKU)

        if not productObject:
            raise GraphQLError("No product with provided SKU.")

        customerObject = CustomUser.objects.get(email=customer_email)

        if not customerObject:
            raise GraphQLError("Customer does not exist.")

        if productObject and customerObject:
            favoriteObject = Favorite(product=productObject, customer=customerObject)
            return AddProductToFavorites(favorite_product=favoriteObject)
        else:
            return None


class RemoveProductFromFavorites(graphene.Mutation):
    class Arguments:
        SKU = graphene.String(required=True)
        customer_email = graphene.String(required=True)

    is_product_removed = graphene.Boolean()

    @login_required
    def mutate(self, info, SKU, customer_email):
        productObject = Product.objects.get(SKU=SKU)

        if not productObject:
            raise GraphQLError("No product with provided SKU.")

        customerObject = CustomUser.objects.get(email=customer_email)

        if not customerObject:
            raise GraphQLError("Customer does not exist.")

        try:
            favoriteObject = Favorite.objects.get(
                customer=customerObject, product=productObject
            )
            favoriteObject.delete()
            return RemoveProductFromFavorites(is_product_removed=True)
        except Favorite.DoesNotExist:
            raise GraphQLError("No favorite with provided data.")


class Mutation(graphene.ObjectType):
    create_customer = CreateCustomer.Field()
    add_product_to_favorites = AddProductToFavorites.Field()
    remove_product_from_favorites = RemoveProductFromFavorites.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
