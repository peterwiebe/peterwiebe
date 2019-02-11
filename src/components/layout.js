import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

// import Header from "./header"
import "./layout.css"

const Layout = ({ children, fullPage, id }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
        <div
          id={id}
          style={{
            margin: `0 auto`,
            maxWidth: `${fullPage ? 'unset' : 960}`,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
            height: `${fullPage ? '100%' : 'inherit'}`
          }}
        >
          <main>{children}</main>
          {/* <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer> */}
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  fullPage: PropTypes.bool,
}

export default Layout
