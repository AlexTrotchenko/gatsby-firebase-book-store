import React,{useContext} from 'react'
import {graphql} from 'gatsby'
import BookItem from '../components/bookItem'
import {BoookComments} from '../components/common'
import FirebaseContext from '../firebase/context'

export const query = graphql`
query($id:String!){
  book(id:{eq:$id}){
      title
      summary
      id
      author{
        author
      }
      localImage {
        childImageSharp {
          fixed(width:200){
            ...GatsbyImageSharpFixed
          }
        }
    }
  }
}
` 

 const BookTamplate = ({data:{book}}) => {
    const {firebase} = useContext(FirebaseContext)
    return (
        <>
        <BookItem 
        title= {book.title}
        author= {book.author.author}
        summary= {book.summary}
        imgSharp={book.localImage.childImageSharp.fixed}
        key={book.id}/>
        {
          firebase
          ?<BoookComments firebase={firebase} bookId ={book.id}/>
          :null
        }
        </>
    )
}


export default BookTamplate