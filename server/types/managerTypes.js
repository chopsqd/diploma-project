module.exports = `
    type Manager {
        id: ID!
        username: String!
        password: String!
        token: String!
    }
    
    type Mutation {
        login(username: String!, password: String!): Manager!
    }
`