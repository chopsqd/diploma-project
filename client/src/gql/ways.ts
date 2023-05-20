import gql from "graphql-tag";

export const FETCH_WAYS_QUERY = gql`
    {
        getWays {
            id
            name
            title
        }
    }
`

export const CREATE_WAY = gql`
    mutation CreateWay($title: String!, $name: String!) {
      createWay(title: $title, name: $name) {
        name
        title
        id
      }
}
`

export const UPDATE_WAY = gql`
    mutation UpdateWay($wayId: ID!, $title: String!, $name: String!) {
      updateWay(wayId: $wayId, title: $title, name: $name)
    }
`

export const DELETE_WAY = gql`
    mutation DeleteWay($wayId: ID!) {
      deleteWay(wayId: $wayId)
    }
`
