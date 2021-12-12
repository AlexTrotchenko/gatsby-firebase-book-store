import React,{useContext} from "react"
import { Link } from "gatsby"
import useBooks from '../hooks/useBooks'
import BookItem from "../components/bookItem"
import styled from 'styled-components'
import FirebaseContext from '../firebase/context'


const LinkButton = styled.div`
  text-align:right;
  margin:8px;
  a{
    text-decoration:none;
    padding:8px;
    background:#1687a7;
    color:white;
    border-radius:8px;
    &:hover{
      background:#276678;
    }
  }
`

const IndexPage = () => {
  const books = useBooks()
  const {firebase} = useContext(FirebaseContext)

  return(
  <>
    {
      books.map(book =>
        <BookItem 
        title={book.title}
        author= {book.author}
        summary= {book.summary}
        imgSharp = {book.imgSharp}
        key={book.id}
        bookId={book.id}
        >
        
          <LinkButton>
              <Link to={`/book/${book.id}`}>Join conversation</Link>
          </LinkButton>
        </BookItem>
   )
  }
  </>
)}

export default IndexPage
