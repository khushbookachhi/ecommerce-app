import React from 'react'
import style from './totalPrice.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions, cartSelector, createOrders, getCartItems } from '../../redux/reducers/cartItemReducers';
import { useNavigate } from 'react-router-dom';
function TotalPrice() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {cartTotalPrice,purchase}=useSelector(cartSelector);
  return (
   <>{cartTotalPrice?<div className={`${style.totalPrice} card text-center mx-2 mb-3` }style={{"width": "17rem","height":"5rem"}}>
  <div className="card-body bg-primary-subtle rounded-2">
    {/* total price display  */}
    <h5 className="card-title fs-5 fw-bold text-dark-emphasis">Total Price:- <span>&#8377;{cartTotalPrice}/-</span></h5>
     {/* Button for purchasing, text depends on whether purchase is in progress */}
    <button className="btn btn-primary fs-4 my-3 px-2 py-0"
    onClick={()=>{
      dispatch(cartActions.setPurchase());
      setTimeout(() => {
        dispatch(createOrders()).then(()=>{
          dispatch(getCartItems()).then(()=>{
            dispatch(cartActions.totalPrice());
          });
        });
        dispatch(cartActions.setPurchase());
        navigate('/myOrders');
      },1000);
    }}
    >{purchase?"Purchasing":"Purchase"}</button>
  </div>
</div>:null}
   </>
  )
}

export default TotalPrice
