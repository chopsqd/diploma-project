const wayTypes = require('./wayTypes')
const voyageTypes = require('./voyageTypes')
const managerTypes = require('./managerTypes')
const {gql} = require("apollo-server");

module.exports = gql`
    ${wayTypes}
    ${voyageTypes}
    ${managerTypes}
`