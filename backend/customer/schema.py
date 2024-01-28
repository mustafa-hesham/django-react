# type: ignore
import graphene
from graphql import GraphQLError
from customer.types import CustomerType
from customer.models import CustomUser, CustomUserManager
import re
from datetime import date


class Query(graphene.ObjectType):
    pass


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


class Mutation(graphene.ObjectType):
    create_customer = CreateCustomer.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
