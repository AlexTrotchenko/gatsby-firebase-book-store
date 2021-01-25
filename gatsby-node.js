/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.onCreateWebpackConfig = ({ actions, stage }) => {
    if (stage === "develop-html" || stage === "build-html") {
      actions.setWebpackConfig({
        resolve: {
          mainFields: ["main"],
        },
      })
    } else {
      actions.setWebpackConfig({
        resolve: {
          mainFields: ["browser", "module", "main"],
        },
      })
    }
  }

exports.createPages = async ({actions,graphql,reporter})=>{
    const result = await graphql(
        `{
            allBook {
              nodes {
                id
              }
            }
          }
        `
    )

    if (result.errors){
        reporter.panic('failed to create posts',result.errors)
    }

    const books = result.data.allBook.nodes

    books.forEach(book=>{
        actions.createPage({
            path:`book/${book.id}`,
            component:require.resolve('./src/templates/bookTemplate.js'),
            context:{
                id:book.id
            }
        })
    })
}
