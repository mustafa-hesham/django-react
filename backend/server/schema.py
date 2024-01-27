# type: ignore
import graphene
import product.schema as productSchema
import cart.schema as cartSchema
import customer.schema as customerSchema


class Query(
    productSchema.schema.Query,
    cartSchema.schema.Query,
    customerSchema.schema.Query,
    graphene.ObjectType,
):
    pass


class Mutation(
    productSchema.schema.Mutation,
    cartSchema.schema.Mutation,
    customerSchema.schema.Mutation,
    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
