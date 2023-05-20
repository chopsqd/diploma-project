const {ApolloServer} = require('apollo-server-express')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

const typeDefs = require('./types')
const resolvers = require('./resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({ req })
})

const app = express();
app.use(express.json())
app.use(cors())
app.use('/static', express.static('static'))

const startApolloServer = async () => {
    await server.start();

    server.applyMiddleware({app, path: '/'});

    mongoose.connect(process.env.MONGODB, { useNewUrlParser: true })
        .then(() => app.listen(process.env.PORT))
        .then(() => console.log('\x1b[1m\x1b[32m%s\x1b[0m',`\nServer running on port: ${process.env.PORT}`))
        .catch(err => console.log('\x1b[1m\x1b[31m%s\x1b[0m',`\nSERVER ERROR:\n${err}`))
}

startApolloServer()