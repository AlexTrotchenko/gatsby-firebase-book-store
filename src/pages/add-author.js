import React,{useState,useContext} from 'react'
import {Input,Form,Button} from '../components/common'
import {FirebaseContext} from '../firebase/'

const AddAuthor = () =>{
    const {firebase} = useContext(FirebaseContext)
    const [authorName,setAuthor]=useState('')
    const [success,setSuccsess]=useState(false)
    const handleChange = e =>{
        e.persist() 
        setSuccsess(false)
        setAuthor(e.target.value)
    }
    const handleSubmit = e =>{
        e.preventDefault()
        return firebase.createAuthor({authorName}).then(r=>{
            setAuthor('')
            setSuccsess(true)
        })
    }
    return(
        <Form onSubmit = {handleSubmit}>
            <Input value={authorName} onChange={handleChange}/>
            {
                success?
                <div>New athor has been successfully added</div>
                :null
            }
            <Button type='submit' block>Add author</Button>
        </Form>
    )
}
export default AddAuthor