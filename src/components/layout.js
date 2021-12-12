/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import FirebaseContext from '../firebase/context'
import useAuth from '../firebase/useAuth'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image';


import Header from "./header"
import "./layout.css"

const ImageBackground = styled(BackgroundImage)`
    background-size: 125px;
    background-repeat:repeat;
    min-height:100vh;
    `

const Layout = ({ children }) => {
  const {user,firebase,loading}=useAuth()
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      image: file(relativePath:{eq:"pattern.png"}){
        sharp: childImageSharp {
            fluid {
                ...GatsbyImageSharpFluid_withWebp 
            }
        }
    }
    }
  `)
//   const{image} = useStaticQuery(graphql`
//   query{
//       image: file(relativePath:{eq:"pattern.png"}){
//           sharp: childImageSharp {
//               fluid {
//                   ...GatsbyImageSharpFluid_withWebp 
//               }
//           }
//       }
//   }
// `)

  return (
      <ImageBackground fluid={data.image.sharp.fluid} fadeIn="soft">
    <FirebaseContext.Provider value={{user,firebase,loading}}>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>

      </div>
    </FirebaseContext.Provider>
      </ImageBackground>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
