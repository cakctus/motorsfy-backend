import { buildSchema } from "graphql"

const carSchema = buildSchema(`

    type Brand {
        id: ID
        name: String
        image: String
    }

    input BrandInput {
        id: ID
        name: String
        image: String
    }

    type Query {
        getAllBrands: [Brand]
    }

    type Mutation {
        createBrand(input: BrandInput) : Brand
    }

`)

export default carSchema
