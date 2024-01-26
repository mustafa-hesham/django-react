import graphene
from graphene_django import DjangoObjectType
from customer.models import CustomUser


class CustomerType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = "__all__"
        exclude = ("password",)


class CustomerTypeInput(graphene.InputObjectType):
    email = graphene.String()
    password = graphene.String()
    password2 = graphene.String()
    first_name = graphene.String()
    last_name = graphene.String()
    birth_date = graphene.String()
