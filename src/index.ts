import { 
    GraphQLServer, 
    JsonLogger 
} from '@dreamit/graphql-server'
import { 
    userSchema, 
    userSchemaResolvers 
} from './ExampleSchemas'
import express from 'express'
import bodyParser from 'body-parser'

const customGraphQLServer = new GraphQLServer(
    {
        schema: userSchema,
        rootValue: userSchemaResolvers,
        logger:  new JsonLogger('express-server', 'user-service'),
    }
)

const graphQLServerPort = 7070
const graphQLServerExpress = express()
graphQLServerExpress.use(bodyParser.text({type: '*/*'}))
graphQLServerExpress.all('/graphql', (request, response) => {
    return customGraphQLServer.handleRequest(request, response)
})
graphQLServerExpress.listen({port: graphQLServerPort})
console.info(`Starting GraphQL server on port ${graphQLServerPort}`)
