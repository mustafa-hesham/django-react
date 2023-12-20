# type: ignore
import graphene
import product.schema as productSchema


class Query(
    productSchema.schema.Query,
    graphene.ObjectType,
):
    pass


class Mutation(
    productSchema.schema.Mutation,
    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
