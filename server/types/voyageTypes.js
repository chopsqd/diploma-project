module.exports = `
    type StopData {
        time: String!
        name: String!
    }

    type VoyageData {
        startTime: String!
        endTime: String!
        price: String!
        wayTime: String!
        days: String!
        fromStation: String!
        toStation: String!
        stops: [StopData]!
        busInfo: String!
        places: [Int]!
        placesCount: Int!
    }

     type Voyage {
        id: ID!
        title: String!
        name: String!
        data: VoyageData!
    }
    
    type Query {
        getVoyages: [Voyage]
        getSearchedVoyages(term: String!, key: String!): [Voyage]
        getOneVoyage(voyageId: ID!): Voyage
    }
    
    input StopInput {
        time: String!
        name: String!
    }
    
    input CreateInput {
        startTime: String!
        endTime: String!
        price: String!
        wayTime: String!
        days: String!
        fromStation: String!
        toStation: String!
        stops: [StopInput]!
        busInfo: String!
        places: [Int]!   
        placesCount: Int!     
    }
    
    type Mutation {
        createVoyage(title: String!, name: String!, createInput: CreateInput!): Voyage!
        updateVoyage(voyageId: ID!, title: String!, name: String!, createInput: CreateInput!): String!
        deleteVoyage(voyageId: ID!): String!
        bookAPlaceOnVoyage(voyageId: ID!, places: Int!, mailTo: String!): Voyage!
    }
`