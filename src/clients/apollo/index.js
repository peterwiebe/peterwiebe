/*
*   NOTE:
*   Needed to move client to its own file because of production build requirements.
*   Example repo with the solution: https://github.com/jlengstorf/gatsby-with-apollo/blob/master/src/apollo/client.js
*/
import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'

export default new ApolloClient({
    uri: "https://peterwiebe-server.now.sh",
    fetch,
    fetchOptions: {
        'Access-Control-Allow-Origin': '*'
    }
})
