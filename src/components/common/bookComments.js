import React,{useEffect,useState,useContext,useRef} from 'react';
import styled from 'styled-components';
import {Input,Button} from './index';
import moment from 'moment';
import {ErrorMessage} from './errorMessage'
import Rating from './rating'
import FirebaseContext from '../../firebase/context';


const StyledForm = styled.form`
    display:flex;
    margin-top:32px;
    ${Input}{
        margin:auto 8px auto 0;
    }
    ${Button}{
        margin:auto 0;
    }
    @media screen and (max-width:800px) {
        flex-direction:column;
        align-items:center
     ${Input}{
        margin:auto 8px auto 8px;
    }
    ${Button}{
        padding:5px 0;
        margin-top:8px;
    }
    }
`

const CommentListItem = styled.div`
    >strong{
        font-size:80%;
        color:#666;
    }
    border-bottom:1px solid #ddd;
    border-radius:5px;
    padding:10px ;
    background-color:rgba(255, 255, 255, 0.6);
`

export const BoookComments = ({bookId})=>{

    const {firebase} = useContext(FirebaseContext)

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

    const subscribed = useRef(false)


    useEffect(()=>{
        if (!firebase) {
            return
        }else if(subscribed.current){
            console.log(subscribed.current)
            return
        }
        let unsubscribe
        try { 
            unsubscribe = firebase.subscribeToBookComments({
                bookId,
                onSnapshot:(snapshot)=>{
                    const snapshotComments = []
                    snapshot.forEach(doc=>
                        snapshotComments.push({
                            id:doc.id,
                            ...doc.data()
                        })
                    )
                    setComments(prevComments => snapshotComments)
                }

            })
            subscribed.current = true
        } catch (error) {
            setErrors(error)
        }

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
                            <span>
                                {comment.bookRating?
                                <Rating size = 'small' rating = {comment.bookRating} readOnly/>
                                
                                :null}
                            </span>
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