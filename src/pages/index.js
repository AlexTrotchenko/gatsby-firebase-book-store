import React from "react"
import { Link } from "gatsby"
import useBooks from '../hooks/useBooks'
import BookItem from "../components/bookItem"
import styled from 'styled-components'

const LinkButton = styled.div`
  text-align:right;
  margin:8px;
  a{
    text-decoration:none;
    padding:8px;
    background:rebeccapurple;
    color:white;
    border-radius:8px;
    &:hover{
      background:indigo;
    }
  }
`

const IndexPage = () => {
  const books = useBooks()
  return(
  <>
    {
      books.map(book =>
        <BookItem 
        title={book.title}
        author= {book.author}
        summary= {book.summary}
        imgSharp = {book.imgSharp}
        key={book.id}>
          <LinkButton>
              <Link to={`/book/${book.id}`}>Join conversation</Link>
          </LinkButton>
        </BookItem>
   )
  }
  </>
)}

export default IndexPage
