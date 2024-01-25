import graphene
import graphql_jwt
from django.contrib.auth import get_user_model
from customer.types import CustomerType


class Query(graphene.ObjectType):
    pass


class CreateCustomer(graphene.Mutation):
    customer = graphene.Field(CustomerType)

    class Arguments:
        email = graphene.String(required=True)
        username = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        password = graphene.String(required=True)
        password2 = graphene.String(required=True)
