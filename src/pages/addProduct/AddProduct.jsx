import React, { useEffect, useState } from 'react'
import style from './addProduct.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, postProducts, productActions, productSelector } from '../../redux/reducers/productsReducer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {categories,productSuccessMsg,productErrorMsg}=useSelector(productSelector);
 const [productName,setProductName]=useState("");
const [productCategories,setProductCategories]=useState('');
const [price,setPrice]=useState(0);
const [stock,setStock]=useState(0);
const [sizes,setSizes]=useState("");
const [file,setFile]=useState(null);
  useEffect(()=>{
   dispatch(getAllCategories()).then(()=>{
    console.log("getAllCategories");
   });
  },[])
  useEffect(()=>{
    if(productSuccessMsg){
   toast.success(productSuccessMsg);
   setTimeout(() => {
    dispatch(productActions.clearMsg());
    navigate('/myProduct')
   },3000);
  }
  if(productErrorMsg){
   toast.error(productErrorMsg);
  }
  dispatch(productActions.clearMsg());
  },[productSuccessMsg,productErrorMsg])
  const handleSelectChange=(e)=>{
    const selectedOptions=Array.from(e.target.selectedOptions).map(option=>option.value);
    const selectedCategoriesString = selectedOptions.join(',');
    setProductCategories(selectedCategoriesString);
  }
  function handleSubmit(){
    console.log(productName," ",file," ",price,' ',productCategories," ",stock," ",sizes);
    dispatch(postProducts({productName,file,price,productCategories,stock,sizes}));
  }
  return (
    <div className='container d-flex flex-column align-items-center
    bg-primary-subtle my-3 rounded'>

      <h1>Add Products here !</h1>
      <form className={` p-3 ${style.container_form} bg-primary-subtle rounded mb-3`}
      onSubmit={(e)=>{e.preventDefault(); handleSubmit();}}>
        <div className='d-flex justify-content-around'>
        <div className="mb-1">
  <label htmlFor="exampleFormControlInput1" className="form-label fs-5 mx-1">Product Name</label>
  <input type="text" className={`${style.input} form-control`} id="exampleFormControlInput1" placeholder="Product Name"
  onChange={(e)=>{setProductName(e.target.value)}}/>
</div>
<div className="mb-1">
  <label htmlFor="exampleFormControlInput1" className="form-label fs-5 mx-1">Product Image</label>
  <input type="file" className="form-control" id="exampleFormControlInput1"
  onChange={(e)=>{ const selectedFile = e.target.files[0];  setFile(selectedFile);}}/>
</div>
        </div>
        <div className='d-flex justify-content-around'>
<div className="mb-1">
  <label htmlFor="exampleFormControlInput1" className="form-label fs-5 mx-1">Price</label>
  <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="1000"
  onChange={(e)=>{setPrice(e.target.value)}}/>
</div>

<div className="mb-1">
  <label htmlFor="exampleFormControlInput1" className="form-label fs-5 mx-1">Stock</label>
  <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="10"
  onChange={(e)=>{setStock(e.target.value)}}/>
</div>

</div>
        <div className='d-flex justify-content-around'>
        <div className="mb-1">
        <label htmlFor="exampleFormControlInput1" className="form-label fs-5 mx-1">Sizes</label>
  <input type="text" className={`${style.input} form-control`} id="exampleFormControlInput1" placeholder="sizes in commas (,)"
  onChange={(e)=>{setSizes(e.target.value)}}/>
</div>
<div className="mb-1">
<label htmlFor="options" className='fs-5 mx-1 mb-1'>Categories:</label>
<select className={`${style.input} form-select form-select-sm fs-5`} size="4" multiple aria-label="Multiple select example"
onChange={handleSelectChange}>
  {categories && categories.map((category,index)=>{
    return  <option value={category._id} key={index}>{category.name}</option>
  })}
</select>
</div>
        </div>

<button type="submit" className="btn btn-primary my-2">Submit</button>
      </form>
    </div>
  )
}

export default AddProduct
