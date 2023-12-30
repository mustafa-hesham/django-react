# type: ignore
import graphene
import product.schema as productSchema
import cart.schema as cartSchema


class Query(
    productSchema.schema.Query,
    cartSchema.schema.Query,
    graphene.ObjectType,
):
    pass


class Mutation(
    productSchema.schema.Mutation,
    cartSchema.schema.Mutation,
    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
