import React, { useEffect } from 'react'
import Card from '../../components/Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByUserID, productActions, productSelector } from '../../redux/reducers/productsReducer'
import { toast } from 'react-toastify';
function MyProduct() {
    const dispatch=useDispatch();
    const {userProducts,productSuccessMsg,productErrorMsg}=useSelector(productSelector);
    
    useEffect(()=>{
    dispatch(getProductsByUserID());
    },[])
    useEffect(()=>{
      if(productSuccessMsg){
     toast.success(productSuccessMsg);
    }
    if(productErrorMsg){
     toast.error(productErrorMsg);
    }
    dispatch(productActions.clearMsg());
    },[productSuccessMsg,productErrorMsg])
  return (
    <div className='container-fluid bg-primary-subtle'>
     <div className='container bg-white p-5 d-flex flex-wrap gap-4'>
        {userProducts.length>0 && userProducts.map((product,index)=>{
            return(
                <Card
                key={index}
                product={product}
                myProduct={true}
                />
            )
        })}
      
     </div>
    </div>
  )
}

export default MyProduct
