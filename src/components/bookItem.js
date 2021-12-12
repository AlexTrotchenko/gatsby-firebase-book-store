import styled from 'styled-components';
import React,{ createContext, useContext,useEffect,useRef, useLayoutEffect,useState,useCallback} from 'react';
import Img from 'gatsby-image';
import Rating,{StarIcon} from './common/rating';
import FirebaseContext from '../firebase/context';
import { Link } from "gatsby";



 const ImgWrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    `
 const ContentWrapper = styled.div`
 margin: 20px;
 display:flex;
 flex-direction:column;
 justify-content:space-between;
 flex-grow:1;
 `

 const BookItemWrapper = styled.section`
    display:flex;
    border: 1px solid #ddd;
    border-radius: 5px;
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
    @media screen and (max-width:800px) {
        flex-direction:column;
        align-items:center
    }
 `

 const RatingContext = createContext()
 const {Provider} = RatingContext

 const Label = ()=>{
     const ratingValue = useContext(RatingContext)
     return( 
     ratingValue?
     <small style={{color:'#666'}}>Your rating {ratingValue}:</small>
     :<small style={{color:'#666'}}>Rate this book</small>)
 }

 const RatingWithHover = ({bookId,children,userRating})=>{

    const [rating, setRating] = React.useState(0);
    const [hoverRating, setHoverRating] = React.useState(0);
    const [loading,setLoading]=React.useState(false)
    const {firebase} = useContext(FirebaseContext)
    const onMouseEnter = (index) => {
      setHoverRating(index);
    };
    const onMouseLeave = () => {
      setHoverRating(0);
    };

    useLayoutEffect(() => {
 if (!userRating) {
     return
 }
 setRating(userRating)

     
    }, [userRating])

    const onSaveRating = 
    async index => {
       
            setLoading(true)
            try {
                setRating(index)
               const res= await firebase.assignRating({rating:index,bookId})
            } catch (error) {
                console.log(error)
                
            }
            setLoading(false)
        }

    return ( <Provider value={userRating}>
        {children}
        <Rating 
        howMuchStars={5}
        rating={rating}
        hoverRating={hoverRating} 
        onMouseEnter={onMouseEnter} 
        onMouseLeave={onMouseLeave} 
        onSaveRating={onSaveRating}
        />
    </Provider>)
 }

 const BookItem = ({title,author,summary,children,imgSharp,bookId}) =>{
     const { user, firebase, loading } = useContext(FirebaseContext)
     const initialState = {rating:0,votes:0,avrRating:0}
     const [ratingObj, setRatingObj] = useState(initialState)
     const {rating,votes,avrRating} = ratingObj
     


    useEffect(() => {
        if(!firebase){
            return;
        }else{
            async function getRatings() {
                try {
                    const res = await firebase.getRatings(bookId);
                       const data = res.data();
                       console.log('I was fired')
                       return data
    
                    } catch (error) {
                         console.log(error);
                    }
            }
            getRatings().then(({ratings,votes,avrRating})=>{
                let rating = 0
                if(user){
                    rating = ratings[user.uid]?ratings[user.uid]:0
               }
              setRatingObj({rating,votes,avrRating})
            })
        }
    }, [firebase,user])


       

     return(
        <BookItemWrapper >
            <ImgWrapper>
                <Img fixed={imgSharp}/>
                    {
                        user && !loading?
                        <>
                        <RatingWithHover userRating ={rating} bookId={bookId}>
                            <Label/>
                        </RatingWithHover>
                        </>
                        :<>
                        <small style={{color:'#666'}}>
                            <Link to = "/login">Login</Link> or 
                            <Link to = "/register"> sign in</Link> to rate this book
                        </small>
                        <Rating disabled/>
                        </>
                    }

            </ImgWrapper>
            <ContentWrapper>
                <div>
                <h2>{title} <small>{author}</small></h2>
                <div>
                    
                    {`Rating: ${avrRating.toFixed(1)}`}
                    <StarIcon fill = 'yellow'/>
                    {` votes (${votes})`}
                </div>
                <div>{summary}</div>
                </div>
                <>
                {children}
                </>
            </ContentWrapper>
        </BookItemWrapper>
     )
 }

export default BookItem