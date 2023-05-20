import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, RequestHandler} from '@apollo/client'
import {setContext} from 'apollo-link-context'
import App from './App'

const httpLink = new HttpLink({
    uri: 'http://localhost:5000'
})

const authLink = setContext(() => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink] as (ApolloLink | RequestHandler)[]),
    cache: new InMemoryCache({ addTypename: false })
})

export default (
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ApolloProvider>
);