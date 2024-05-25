import React, { useEffect, useState } from 'react'
import style from './update.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, productActions, productSelector, updateProducts } from '../../redux/reducers/productsReducer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function UpdateProduct() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
  const {categories,updateProduct,productSuccessMsg,productErrorMsg}=useSelector(productSelector);
const [selectedCategories,setSelectedCategories]=useState([]);
const [productName,setProductName]=useState('');
const [productCategories,setProductCategories]=useState('');
const [price,setPrice]=useState(0);
const [stock,setStock]=useState(0);
const [sizes,setSizes]=useState('');
const [file,setFile]=useState(null);

  useEffect(()=>{
    
    dispatch(getAllCategories()).then(()=>{
     console.log("getAllCategories");
    });
   },[])
   useEffect(()=>{
    
    if(updateProduct && updateProduct.categories){
        setSelectedCategories(updateProduct.categories);
        setProductCategories(updateProduct.categories);
    }
    setProductName(updateProduct.name);
    setPrice(updateProduct.price);
    setStock(updateProduct.stock);
     setSizes(updateProduct.sizes.toString());
     setFile(updateProduct.imageUrl);
   },[updateProduct]);
   useEffect(()=>{
   
    if(sizes.length>0){
      console.log("orignal String ",sizes);
    checkSizes(sizes);
      
    }
   },[sizes])
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
    // const selectedCategoriesString = selectedOptions.join(',');
    setSelectedCategories(selectedOptions);
    setProductCategories(selectedOptions);
  }
  //function to submit the form 
  function checkSizes(orignalString){
const cleanedString=orignalString.split(',').filter(item=>item).join(',');
setSizes(cleanedString);
  }
  function handleSubmit(){
    
    console.log(productName," ",file," ",price,' ',productCategories," ",stock," ",sizes);
    dispatch(updateProducts({productID:updateProduct._id,productName,file,price,productCategories,stock,sizes}));
  }
  return (
    <div className='container d-flex flex-column align-items-center
    bg-primary-subtle my-3 rounded'>

      <h1>Update Products here !</h1>
      <form className={` p-3 ${style.container_form} bg-primary-subtle rounded mb-3`}
      onSubmit={(e)=>{e.preventDefault(); handleSubmit()}}>
        <div className='d-flex justify-content-around'>
        <div className="mb-1">
  <label htmlFor="exampleFormControlInput1" className="form-label fs-5 mx-1">Product Name</label>
  <input type="text" className={`${style.input} form-control`} id="exampleFormControlInput1" defaultValue={updateProduct.name} placeholder="Product Name"
  onChange={(e)=>{console.log(e.target.value);setProductName(e.target.value)}}/>
</div>
<div className="mb-1">
  <label htmlFor="exampleFormControlInput1" className="form-label fs-5 mx-1">Product Image</label>
  <input type="file" className="form-control" id="exampleFormControlInput1"
onChange={(e)=>{ const selectedFile = e.target.files[0];  setFile(selectedFile);}} />
</div>
        </div>
        <div className='d-flex justify-content-around'>
<div className="mb-1">
  <label htmlFor="exampleFormControlInput1" className="form-label fs-5 mx-1">Price</label>
  <input type="number" className="form-control" id="exampleFormControlInput1" defaultValue={updateProduct.price} placeholder="1000"
   onChange={(e)=>{setPrice(e.target.value)}}/>
</div>

<div className="mb-1">
  <label htmlFor="exampleFormControlInput1" className="form-label fs-5 mx-1">Stock</label>
  <input type="number" className="form-control" id="exampleFormControlInput1" defaultValue={updateProduct.stock} placeholder="10"
   onChange={(e)=>{setStock(e.target.value)}}/>
</div>

</div>
        <div className='d-flex justify-content-around'>
        <div className="mb-1">
        <label htmlFor="exampleFormControlInput1" className="form-label fs-5 mx-1">Sizes</label>
  <input type="text" className={`${style.input} form-control`} id="exampleFormControlInput1" defaultValue={updateProduct.sizes} placeholder="sizes in commas (,)"
   onChange={(e)=>{setSizes(e.target.value)}}/>
</div>
<div className="mb-1">
<label htmlFor="options" className='fs-5 mx-1 mb-1'>Categories:</label>
{selectedCategories.length>0 &&
    <select  value={selectedCategories} className={`${style.input} form-select form-select-sm fs-5`} size="4" multiple aria-label="Multiple select example"
    onChange={handleSelectChange}>
  {categories && categories.map((category,index)=>{
        return  <option value={category._id} key={index}>{category.name}</option>
  })}
</select>}
</div>
        </div>

<button type="submit" className="btn btn-primary my-2">Update</button>
      </form>
    </div>
  )
}

export default UpdateProduct
