import {graphql,useStaticQuery} from 'gatsby'

const useBooks = ()=>{
    const data = useStaticQuery(graphql`
     {
        allBook {
          nodes {
              id
            summary
            title
            author {
              author
            }
            localImage {
              childImageSharp {
                fixed(width:300){
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
      
    `)
    return data.allBook.nodes.map(book=>
        ({
            title:book.title,
            summary:book.summary,
            author:book.author.author,
            id:book.id,
            imgSharp:book.localImage.childImageSharp.fixed
        }))
}

export default useBooks