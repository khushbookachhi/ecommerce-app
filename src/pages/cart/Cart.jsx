import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { cartActions, cartSelector, getCartItems } from '../../redux/reducers/cartItemReducers';
import Card from '../../components/Card/Card';
import { toast } from 'react-toastify';
import TotalPrice from '../../components/totalPrice/TotalPrice';


function Cart() {
    const location=useLocation();
    const [isCart,setIsCart]=useState("");
     const dispatch=useDispatch();
     const {cartSuccessMsg,cartErrorMsg,cartTotalPrice,cartItemsList}=useSelector(cartSelector);
    useEffect(()=>{
     dispatch(getCartItems()).then(()=>{
        dispatch(cartActions.totalPrice());
     });
    },[]);
    useEffect(()=>{
      dispatch(cartActions.initializeRemoving({cartItemsList}))
    },[cartItemsList])
    useEffect(()=>{
        setIsCart(location.pathname);
    },[setIsCart])
    useEffect(()=>{
        console.log(isCart);
    },[isCart])
  
    useEffect(()=>{
        if(cartSuccessMsg){
          toast.success(cartSuccessMsg);
        }
        if(cartErrorMsg){
          toast.error(cartErrorMsg);
        }
        setTimeout(() => {
          dispatch(cartActions.clearMsg());
        },3000);
       
      },[cartSuccessMsg,cartErrorMsg])
      useEffect(()=>{
        if(cartTotalPrice){
            console.log("total cart Price is ",cartTotalPrice);
        }
      },[cartTotalPrice]);
  return (
    <div className='container-fluid bg-white  d-flex justify-content-between'>
        <TotalPrice/>
    <div className='container bg-white p-5 d-flex flex-wrap gap-4'>
       { cartItemsList.length>0 && cartItemsList.map((product,index)=>{
      
           return(
            <Card
            key={index} 
               product={product.productID}
               index={index}
               path={isCart}
               cartID={product._id}
               cart={product}
               />
          
           )
       })} 
     
    </div>
   
   </div>
  )
}

export default Cart
