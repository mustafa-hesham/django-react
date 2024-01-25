from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model


class CustomerType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        exclude = ("password",)
