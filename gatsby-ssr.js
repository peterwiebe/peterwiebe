/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from './src/clients/apollo'


export const wrapRootElement = ({ element }) => (
    <ApolloProvider client={ApolloClient}>
        {element}
    </ApolloProvider>
)

