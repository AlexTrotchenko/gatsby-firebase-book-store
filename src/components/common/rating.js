import React from 'react'
import styled from 'styled-components'


const StyledSVG = styled.svg`
width:${props => props.size === 'normal'? '1.5em' : '1em'};
height:${props => props.size === 'normal'? '1.5em' : '1em'};
margin-bottom:-5px;
cursor: pointer;
cursor:${props => props.disabled? 'unset' : 'pointer'}
`



export function StarIcon(props) {
    const { fill = 'none',disabled=false , size} = props;
    return (
      <StyledSVG size = {size}  fill={fill} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></StyledSVG>
    );
  }


function Star({
  index,
  rating=null,
  hoverRating=null,
  onMouseEnter=()=>{},
  onMouseLeave=()=>{},
  onSaveRating=()=>{},
  disabled=false,
  readOnly=false,
  size='normal'
}) {
  


  const fill = React.useMemo(() => {
    if (hoverRating >= index) {
      return 'yellow';
    } else if (!hoverRating && rating >= index) {
      return 'yellow';
    
    }
    return 'none';
  }, [rating, hoverRating,readOnly, index]);
  
  return (
    !disabled?
      <div 
        className="cursor-pointer"
        onMouseEnter={() => onMouseEnter(index)} 
        onMouseLeave={() => onMouseLeave()} 
        onClick={() => onSaveRating(index)}>
        <StarIcon size={size} fill={fill} />
      </div>
      :
      <div>
      <StarIcon size={size} disabled fill={readOnly?fill:'#d3d3d3'} />
     </div>
  )
}


  
const Rating = ({howMuchStars=5,...restProps}) => {

  return (
    <div style={{display:'flex'}}>
    {
    Array.from(Array(+howMuchStars)).map((e,i)=>
    <Star key={i} index={i+1} {...restProps}/>
    )}
  </div>
  )
}

  
export default Rating