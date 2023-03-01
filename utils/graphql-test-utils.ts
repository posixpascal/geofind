// utils/graphql-test-utils.js

// Utility to match GraphQL mutation based on the operation name
import {CyHttpMessages} from "cypress/types/net-stubbing";
import IncomingHttpRequest = CyHttpMessages.IncomingHttpRequest;

export const hasOperationName = (req: IncomingHttpRequest, operationName:string) => {
    const { body } = req
    return (
        body.hasOwnProperty('operationName') && body.operationName === operationName
    )
}

// Alias query if operationName matches
export const aliasQuery = (req: IncomingHttpRequest, operationName:string) => {
    if (hasOperationName(req, operationName)) {
        req.alias = `gql${operationName}Query`
    }
}

// Alias mutation if operationName matches
export const aliasMutation = (req: IncomingHttpRequest, operationName:string) => {
    if (hasOperationName(req, operationName)) {
        req.alias = `gql${operationName}Mutation`
    }
}