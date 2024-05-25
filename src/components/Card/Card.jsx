import React, { useEffect, useState } from 'react'
import style from './card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/reducers/userReducers';
import { addToCart, cartActions, cartSelector, deleteCartItems, getCartItems, updateQuantity } from '../../redux/reducers/cartItemReducers';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, getProductsByUserID, productActions, productSelector } from '../../redux/reducers/productsReducer';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
// import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { faPen,faTrash,faStar } from '@fortawesome/free-solid-svg-icons';

function Card({product,path,index,cartID,myProduct,cart}) {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {userType}=useSelector(userSelector);
    const {editItem,cartQuantity,cartProductID,removing}=useSelector(cartSelector);
    const{adding}=useSelector(productSelector);
    const [quantity,setQuantity]=useState(0);
    const [totalPrice,setTotalPrice]=useState(0);
useEffect(()=>{
setQuantity(cartQuantity);
},[cartQuantity])
function addCart(productID){
  let isBoolean="true";
  dispatch(productActions.setAdding({index,isBoolean}));
  dispatch(addToCart({productID}));
  setTimeout(() => {
    let isBoolean="false";
    dispatch(productActions.setAdding({index,isBoolean}));
  }, 3000);
}
  function deleteCart(cartID){
    let isBoolean="true";
    dispatch(cartActions.setRemoving({index,isBoolean}));
setTimeout(() => {
  dispatch(deleteCartItems({cartID:cartID})).then(()=>{
    dispatch(getCartItems()).then(()=>{
      dispatch(cartActions.totalPrice());
    });
   
  })
  let isBoolean="false";
  dispatch(cartActions.setRemoving({index,isBoolean}));
},1000);
  }
  function quantitySubmit(price,cartID){
    setTotalPrice(price*quantity);
    dispatch(updateQuantity({quantity,cartID})).then(()=>{
      dispatch(getCartItems()).then(()=>
      dispatch(cartActions.totalPrice()));

    })
   }
  return (
    <div className="card position-relative d-flex flex-column align-items-center text-center  mb-4 border border-0 shadow rounded" style={{"width": "18rem","height":"33rem","cursor":"pointer"}} onClick={()=>{
      if(!path){
         dispatch(productActions.setProductID({productID:product._id}))
      } 
    }}>
     {myProduct && <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle py-1"
     onClick={()=>{dispatch(deleteProduct({productID:product._id}))
      dispatch(getProductsByUserID());
     }}>
      <FontAwesomeIcon icon={faTrash} style={{color: "#ffffff",}} />
  </span> } 
  {myProduct && <span className={`position-absolute top-0 ${style.badge} translate-middle p-2 bg-primary border border-light rounded-circle py-1`}
  onClick={()=>{ dispatch(productActions.setUpdateProduct({product:product}))
    navigate('/updateProduct');
  }}>
  <FontAwesomeIcon icon={faPen} style={{color: "#ffffff",}}/>
  </span>}
  {path &&    <span className="position-absolute top-0 start-100 translate-middle badge">
  {/* button to edit cart  */}
  <button className={`${style.nostyle} rounded-circle p-2 bg-warning text-dark fs-6`} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
  onClick={()=>{dispatch(cartActions.setEditItem({product,cartQuantity:cart.quantity,cartID})); setTotalPrice(0)}}
  ><FontAwesomeIcon icon={faPen} style={{color: "#000",}}/></button>
  </span>}
    <img src={`https://seven-e-commerce-api.onrender.com/`+product.imageUrl}
     className={`card-img-top ${style.card_img}`}alt="..." onClick={()=>{
      navigate('/reviews')
     }}/>
    <div className={`${style.CardBody} card-body`}>
      <h5 className="card-title">{product.name}</h5>
     {!path && <span className=''><FontAwesomeIcon icon={faStar} style={{color:"#ffc107"}}/> <h6 className='d-inline'>{product.averageRating}</h6>&nbsp;&nbsp; <h6 className='d-inline'>Ratings:{product.countRatings}</h6></span> }
      <h5 className={`fw-bold ${path && "d-inline mx-5"}`}>&#8377; {product.price}</h5>  {path && <span className='px-2 text-light-emphasis fw-bold fs-6'>Qty: {cart.quantity}</span>}
      {userType==="customer" &&<button className={`${!path?'btn-primary':'btn-danger'} btn btn-lg`}
      onClick={()=>{!path ? addCart(product._id):
      deleteCart(cartID)}}>
       {!path?adding[index]?"Adding":"Add To Cart":removing[index]?"Removing":"Remove From Cart"}</button>}
    </div>
  
     {/* //offCanvas Right  */}
     <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasRightLabel">Edit Item</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">

  {editItem && <div className='container my-3'>
        <h5 className='text-start'>{editItem.name.split(/\s+/).slice(0,4).join(' ')}...</h5>
        <p className='text-light-emphasis fw-semibold fs-5 text-start'>Price:- {editItem.price}</p>
        <p className='text-light-emphasis fw-semibold fs-5 text-start'>Size:- {editItem.sizes.map((size,index)=>{ return <span key={index}>{size} </span>})}</p>
    </div>} 
    <form className=' d-flex justify-content-around align-items-center my-5' 
    onSubmit={(e)=>{e.preventDefault(); quantitySubmit(editItem.price,cartProductID)}}>
      <label className='fs-5 fw-semibold text-start' >Edit quantity</label>
      <input className='form-control form-control-sm border border-primary fw-bolder' type="number" value={quantity}  placeholder={cartQuantity} required
      onChange={(e)=>{console.log(e.target.value); setQuantity(e.target.value)}}/>
      <button type='submit' className={`${style.add} btn btn-primary`}> Add</button>
    </form>

    <div className='container my-5 p-0'>
      <p className='text-start fs-3 fw-bold'>totalPrice:- {totalPrice>0 ?totalPrice: (editItem && editItem.price*cartQuantity)  }</p>
    </div>
  </div>
</div>
  </div>
  )
}

export default Card
