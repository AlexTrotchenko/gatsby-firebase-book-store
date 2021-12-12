import React,{useState,useContext} from "react"
import FirebaseContext from '../firebase/context'
import {Form,Input,Button,ErrorMessage} from '../components/common'
import { navigate } from "gatsby"



const Login = () => {

    const[credentials,setCredentials] = useState({email:'',password:''})
    const[errorMassages,setErrorMassages]=useState('')
    const{firebase} = useContext(FirebaseContext)

    const handleSubmit = e =>{
        e.preventDefault()

        firebase.login(credentials).then(()=>navigate(-1)).catch(error=>
            setErrorMassages(error.message)
            )

    }

    const handleCange = e => {
        setErrorMassages('')
        const {name,value}=e.target;
        setCredentials({
            ...credentials,[name]:value
        })
    }
    
    return(
        <>
            <Form onSubmit = {handleSubmit}>
                <Input type="email" placeholder="email" name="email" value={credentials.email} onChange={handleCange} required/>
                <Input type="password" placeholder="password" name="password" value={credentials.password} onChange={handleCange} required/>
                {
                    errorMassages
                    ?<ErrorMessage>{errorMassages}</ErrorMessage>
                    :null
                }
                <Button type = "submit" block>Login</Button>
            </Form>
        </>
)}

export default Login
