import React, { useEffect, useState } from 'react'
import style from './review.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { getReviews, postReviews, productSelector } from '../../redux/reducers/productsReducer';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { userSelector } from '../../redux/reducers/userReducers';

function Review() {
    const dispatch=useDispatch();
    const {userType}=useSelector(userSelector);
    const {productID,reviews}=useSelector(productSelector);
    const [yellow,setYellow]=useState(new Array(5).fill(false));
    const [userRating,setUserRating]=useState([]);
   const [sameIndex,setSameIndex]=useState(-1);
   useEffect(()=>{
    if(productID)
    dispatch(getReviews({productID:productID}));
   },[])
    useEffect(()=>{
   const ratings=reviews.map(review=>{
    let ratingArray=new Array(5).fill(false);
    for(let i=0; i<review.rating; i++){
        ratingArray[i]=true;
    }
    return ratingArray;
   })
    setUserRating(ratings);
    },[reviews,setUserRating])

    const setYellowOnClick=(index)=>{
       
        setYellow((prevState)=>{
            const newState=[...prevState];
          if(sameIndex!==index){
            for (let i = 0; i < newState.length; i++) {
                newState[i] = i <= index; // Set true for all indices up to and including `index`, false otherwise
          }
          }else{
            for (let i = 0; i <=index; i++) {
                newState[i] = !newState[i]; 
          }
          } 
              return newState;
        }
    );
    setSameIndex(index);
    };

    const handleSubmit=()=>{
    const starCount=yellow.filter(Boolean).length;
    if(productID){
        dispatch(postReviews({productID:productID,rating:starCount}))
        .then(()=>{
            dispatch(getReviews({productID:productID}))
        });
    }
    setYellow((prevState)=>{
        const newState=[...prevState];
        for (let i = 0; i <newState.length; i++) {
            newState[i] = false;
      }
      return newState;
    })
    // alert(`Selected star count: ${starCount}`);
    }
  return (
    <>
     <div className='container-fluid d-flex justify-content-around'>
   <div className={`${style.div1} d-flex flex-column my-5`}>
   <h1 className='text-center my-2'>Product Reviews</h1>
   
   <ul className='mx-5 px-5'>
    {reviews.length>0 ?reviews.map((review,index)=>{
     return <li key={index}>
        <h5 className='text-decoration-underline'>{review.user.name}</h5>
        <div>
            {userRating && userRating[index]?.map((rating,startIndex)=>{
                return <span key={startIndex}>
                    {<FontAwesomeIcon icon={faSolidStar} style={{ fontSize: '1em',color:rating?"#ffc107":"grey"}}/>
        }</span>
                        
            })}
        </div>
    </li>
    }):<h1 className='my-5'>No Ratings on Product!!</h1>}
    
    
   </ul>
 
  
   </div>
  {userType==='customer' &&  <div className={`${style.div1} bg-white my-5`}>
   <div className={`${style.ratingBox} bg-dark-subtle rounded-4`}>
    <h2>Rate this product</h2>
    <form onSubmit={(e)=>{ e.preventDefault();handleSubmit()}}>
    <div className={`${style.ratings}`}>
        {yellow.map((isYellow,index)=>{
 return <span onClick={()=>{setYellowOnClick(index)}} 
key={index}
  >{isYellow?<FontAwesomeIcon icon={faSolidStar} style={{ fontSize: '3em',color:"#ffc107"}}/>
: <FontAwesomeIcon icon={faRegularStar} style={{ fontSize: '3em'}}/>}</span>
        })}
    
    </div>
    <button className='btn btn-primary my-3 fs-5 fw-bolder p-0' type="submit">Post</button>
    </form>
   
   </div>
   </div>}
    </div>
    </>
   
  )
}

export default Review
