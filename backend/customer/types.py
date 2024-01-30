import graphene
from graphene_django import DjangoObjectType
from customer.models import CustomUser, Favorite


class CustomerType(DjangoObjectType):
    class Meta:
        model = CustomUser
        exclude = ("password",)


class CustomerTypeInput(graphene.InputObjectType):
    email = graphene.String()
    password = graphene.String()
    password2 = graphene.String()
    first_name = graphene.String()
    last_name = graphene.String()
    birth_date = graphene.String()


class FavoriteType(DjangoObjectType):
    class Meta:
        model = Favorite
        fields = "__all__"
