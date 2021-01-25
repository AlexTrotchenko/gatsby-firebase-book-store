import React,{useContext,useState,useEffect} from 'react'
import {FirebaseContext} from '../firebase/'
import {Form,Input,Button} from '../components/common'
import styled from 'styled-components'

const FormField = styled.div`
    margin-bottom:20px;
    select{
        display: block;
        
    }
`
 let fileReader 
 if(typeof window !== 'undefined'){
    fileReader = new FileReader()
 }

const AddBook = () =>{
    const {firebase} = useContext(FirebaseContext)
    const [authors,setAuthors] = useState([])
    const [bookData,setBookData]=useState({bookSummary:'',authorId:'',bookName:''})
    const [bookCover,setBookCover]=useState('')

    useEffect(()=>{
        fileReader.addEventListener('load',()=>setBookCover(fileReader.result))
        return fileReader.removeEventListener('load',()=>setBookCover(fileReader.result))
    },[])

    useEffect(()=>{
        const avlibleAuthors = []
        if(firebase){
            firebase.getAuthors().then(snapshot=>{
                snapshot.forEach(doc=>{
                    avlibleAuthors.push({
                        id:doc.id,
                        ...doc.data()
                    })
                })
                setAuthors(avlibleAuthors)
                setBookData({...bookData,authorId:avlibleAuthors[0].id})
            })
        }
    },[firebase])

    const handleOnChange = e =>{
        e.persist()
        const{value,name}=e.target;
        setBookData({...bookData,[name]:value})
    }
    const handleSubmit = e =>{
        e.preventDefault()
        const book = {...bookData,bookCover}
        console.log(book)
        firebase.createBook(book)
    }
    return(
    <Form onSubmit={handleSubmit}>
        <FormField>
            <Input placeholder='book name' name='bookName' value={bookData.bookName} onChange={handleOnChange}/>
        </FormField>
        <FormField>
            <strong>
            author
            </strong>
            <select name='authorId' value={bookData.authorId} onChange={handleOnChange}>
                {
                    authors.map(author=>(
                    <option key = {author.id} value={author.id}>
                        {author.author}
                    </option>
                    ))
                }
            </select>
        </FormField>
        <FormField>
            <strong>
                book cover
            </strong>
            <Input type='file' name='bookCover' onChange={
                e=>{
                    e.persist()
                    fileReader.readAsDataURL(e.target.files[0])
                }
            }/>
        </FormField>
        <FormField>
            <Input placeholder='summary' name='bookSummary' value={bookData.bookSummary} onChange={handleOnChange}/>
        </FormField>
        <Button type='submit' block>Add book</Button>
    </Form>
    )
}

export default AddBook