import React from 'react'
import {graphql} from 'gatsby'
import BookItem from '../components/bookItem'
import {BoookComments} from '../components/common'

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
    return (
        <>
        <BookItem 
        title= {book.title}
        author= {book.author.author}
        summary= {book.summary}
        imgSharp={book.localImage.childImageSharp.fixed} 
        bookId = {book.id}
        key={book.id}/>
        <BoookComments bookId ={book.id}/>

        </>
    )
}


export default BookTamplate