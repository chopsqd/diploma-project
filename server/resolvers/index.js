const waysResolvers = require('./ways')
const voyagesResolvers = require('./voyages')
const managersResolvers = require('./managers')

module.exports =  {
    Query: {
        ...waysResolvers.Query,
        ...voyagesResolvers.Query
    },
    Mutation: {
        ...waysResolvers.Mutation,
        ...voyagesResolvers.Mutation,
        ...managersResolvers.Mutation
    },
}