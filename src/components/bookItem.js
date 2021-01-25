import styled from 'styled-components';
import React from 'react';
import Img from 'gatsby-image';

 const ImgWrapper = styled.div``
 const ContentWrapper = styled.div`
 margin-left:8px;
 flex-grow:1;
 `

 const BookItemWrapper = styled.section`
    display:flex;
    border: 1px solid #ddd;
    padding:8px;
    margin-bottom:8px;
    background:white;
    h2{
        small{
            padding-left:8px;
            font-size:14px;
            font-weight:normal
        }
    }
 `

 const BookItem = ({title,author,summary,children,imgSharp}) =>{
     return(
        <BookItemWrapper >
            <ImgWrapper>
                <Img fixed={imgSharp}/>
            </ImgWrapper>
            <ContentWrapper>
                <h2>{title} <small>{author}</small></h2>
                <div>{summary}</div>
                <>
                {children}
                </>
            </ContentWrapper>
        </BookItemWrapper>
     )
 }

export default BookItem