import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model


class CustomerType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        exclude = ("password",)


class CustomerTypeInput(graphene.InputObjectType):
    email = graphene.String()
    password = graphene.String()
    password2 = graphene.String()
    firstName = graphene.String()
    lastName = graphene.String()
    birthDate = graphene.String()
