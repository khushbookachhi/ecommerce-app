import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartSelector, getOrders } from '../../redux/reducers/cartItemReducers';

function MyOrder() {
  const dispatch=useDispatch();
  const {orders}=useSelector(cartSelector);

useEffect(()=>{
  dispatch(getOrders());
},[])
  return (
    <>
      
    <div className="container-fluid d-flex flex-column align-items-center my-4">
    <h2>Your Orders</h2>
    
<div className="container">
{orders.length>0 && orders.map((item,index)=>{
  return (<div className="container d-flex flex-column align-items-center my-2" key={index}>
  <p className="text-center fs-4 fw-bold text-dark-emphasis">Ordered On:- {item.orderDate.slice(0,10)}</p>
  <table className="table table-bordered text-center p-0" style={{"width":"60vw"}}>
 <thead className="border border-bottom-0">
 <tr>
 <th scope="col">Title</th>
 <th scope="col">Price</th>
 <th scope="col">Quantity</th>
 <th scope="col">Total Price</th>
 </tr>
 </thead>
   {/* every cartItems in one order */}
    { item.items.map((cartItem,index)=>{
    return  <tbody key={index}>
     <tr>
     <td>{cartItem.title.split(/\s+/).slice(0, 6).join(' ')}...</td>
     <td>{cartItem.price}</td>
 <td>{cartItem.quantity}</td>
 <td>{cartItem.totalPrice}</td>
 </tr>
 </tbody>
     })}
     <tbody>
     <tr>
       <td></td>
       <td></td>
       <td></td>
       <td>{item.totalAmount}</td>
 </tr>
 </tbody>
 </table>
 </div>)
})}
    </div>
    {/* container  */}
    </div>
     </>
  )
}

export default MyOrder
