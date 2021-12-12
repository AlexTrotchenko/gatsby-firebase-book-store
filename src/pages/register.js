import React,{useState,useContext} from 'react';
import {Form,Input,Button,ErrorMessage} from '../components/common';
import FirebaseContext from '../firebase/context';
import { navigate } from "gatsby";


const Register = () =>{

    const{firebase} = useContext(FirebaseContext)

    const[credentials,setCredentials] = useState({email:'',password:'',confirmPassword:'',userName:''})
    const[errorMassages,setErrorMassages]=useState('')


    const handleChange = event =>{
        setErrorMassages('')
        const{name,value}=event.target;
        setCredentials({...credentials,[name]:value})
    }

    const handleSubmit = event =>{
        event.preventDefault()
        if (credentials.password===credentials.confirmPassword){
            firebase.register({
                userName:credentials.userName,
                email:credentials.email,
                password:credentials.password
            }).then(()=>navigate(-1)).catch(error=>setErrorMassages(error.message))
        }else{
            setErrorMassages('Passwords should match')
        }
    }
    return(
        <Form onSubmit = {handleSubmit}>
            <Input type = "text" value = {credentials.userName} name = "userName" placeholder = "user name" onChange = {handleChange} required/>
            <Input type = "email" value = {credentials.email} name = "email" placeholder = "email" onChange = {handleChange} required/>
            <Input type = "password" value = {credentials.password} name = "password" placeholder = "password" onChange = {handleChange} required minLength={6}/>
            <Input type = "password" value = {credentials.confirmPassword} name = "confirmPassword" placeholder = "confirm password" onChange = {handleChange} required minLength = {6}/>
            {
                errorMassages
                ?<ErrorMessage>{errorMassages}</ErrorMessage>
                :null
            }
            <Button type = "submit" block>Register</Button>

        </Form>
    )
    
}

export default Register