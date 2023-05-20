module.exports = `
    type Way {
        id: ID!
        title: String!
        name: String!
    }
    
    type Query {
        getWays: [Way]
    }
    
    type Mutation {
        createWay(title: String!, name: String!): Way!
        deleteWay(wayId: ID!): String!
        updateWay(wayId: ID!, title: String!, name: String!): String!
    }
`