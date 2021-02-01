import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import {Input,Button} from './index';
import moment from 'moment';
import {ErrorMessage} from './errorMessage'

const StyledForm = styled.form`
    display:flex;
    margin-top:32px;
    ${Input}{
        margin:auto 8px auto 0;
    }
    ${Button}{
        margin:auto 0;
    }
`

const CommentListItem = styled.div`
    >strong{
        font-size:80%;
        color:#666;
    }
    border-bottom:1px solid #ddd;
    padding:4px 0;
`

export const BoookComments = ({firebase,bookId})=>{

    const [comments,setComments] = useState([])
    const [postText,setPostText] = useState('')
    const [errors,setErrors] = useState('')

    const handleSubmit = e =>{
        e.preventDefault()
        firebase.postComment({
            text:postText,
            bookId
        })
        .catch(err=>{
            const {message} = err
            setErrors(message)
        }
            
        )
        setPostText('')
    }

    useEffect(()=>{
        const unsubscribe = firebase.subscribeToBookComments({
            bookId,
            onSnapshot:(snapshot)=>{
                const snapshotComments = []
                snapshot.forEach(doc=>
                    snapshotComments.push({
                        id:doc.id,
                        ...doc.data()
                    })
                )
                setComments(snapshotComments)
            }
        })

        return ()=>{
            if(unsubscribe){
                unsubscribe()
            }
        }
    },[])


    return(
        <>  
            <StyledForm onSubmit = {handleSubmit}>
                <Input value = {postText} onChange = {e=>{
                    e.persist()
                    setErrors('')
                    setPostText(e.target.value)
                }}/>
                <Button type='submit'>
                    Post comment
                </Button>
            </StyledForm>
            {
                errors
                ?<ErrorMessage>{errors}</ErrorMessage>
                :null
            }
            {
                comments.map(comment =>(
                        <CommentListItem key = {comment.id}>
                            <strong>
                                {comment.userName} - {moment(comment.dateCreated.toDate()).format('HH:mm Do MMM YYYY')}
                            </strong>
                            <div>
                                {comment.text}
                            </div>
                        </CommentListItem>
                    )
                )
            }
        </>
    ) 
}