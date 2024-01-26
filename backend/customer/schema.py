import graphene
from graphql import GraphQLError
from customer.types import CustomerType, CustomerTypeInput


class Query(graphene.ObjectType):
    pass


class CreateCustomer(graphene.Mutation):
    customer = graphene.Field(CustomerType)

    class Arguments:
        email = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        password = graphene.String(required=True)
        password2 = graphene.String(required=True)
        birth_date = graphene.String(required=False)

    def mutate(
        self, info, email, first_name, last_name, password, password2, birth_date
    ):
        if password != password2:
            raise GraphQLError("Password and confirm password does not match.")
