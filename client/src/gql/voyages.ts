import gql from "graphql-tag";

export const FETCH_VOYAGES_QUERY = gql`
    {
        getVoyages {
            name
            title
            id
            data {
              startTime
              wayTime
              toStation
              stops {
                name
                time
              }
              price
              placesCount
              places
              fromStation
              endTime
              days
              busInfo
            }
          }
    }
`

export const FETCH_SEARCH_VOYAGES_QUERY = gql`
    query GetSearchedVoyages($term: String!, $key: String!) {
      getSearchedVoyages(term: $term, key: $key) {
        title
        name
        id
        data {
          startTime
          endTime
          wayTime
          price
          days
        }
      }
    }
`

export const FETCH_ONE_VOYAGE = gql`
    query GetOneVoyage($voyageId: ID!) {
      getOneVoyage(voyageId: $voyageId) {
        title
        name
        id
        data {
          wayTime
          toStation
          stops {
            time
            name
          }
          startTime
          price
          placesCount
          places
          fromStation
          endTime
          days
          busInfo
        }
      }
    }
`

export const UPDATE_VOYAGES_QUERY = gql`
    mutation Mutation($voyageId: ID!, $title: String!, $name: String!, $createInput: CreateInput!) {
        updateVoyage(voyageId: $voyageId, title: $title, name: $name, createInput: $createInput)
    }
`

export const DELETE_VOYAGE = gql`
    mutation DeleteVoyage($voyageId: ID!) {
        deleteVoyage(voyageId: $voyageId)
    }
`

export const CREATE_VOYAGE = gql`
    mutation CreateVoyage($title: String!, $name: String!, $createInput: CreateInput!) {
      createVoyage(title: $title, name: $name, createInput: $createInput) {
        id
      }
    }
`

export const BOOKING_VOYAGE = gql`
    mutation BookAPlaceOnVoyage($voyageId: ID!, $mailTo: String!, $places: Int!) {
      bookAPlaceOnVoyage(voyageId: $voyageId, mailTo: $mailTo, places: $places) {
        id
        title
      }
}
`