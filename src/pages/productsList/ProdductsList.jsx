import React, { useEffect, useState } from 'react';
import style from './products.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts, getAllCategories, getProductsList, productActions, productSelector } from '../../redux/reducers/productsReducer';
import Card from '../../components/Card/Card';
import { toast } from 'react-toastify';
import { cartActions, cartSelector } from '../../redux/reducers/cartItemReducers';

function ProdductsList() {
  const dispatch=useDispatch();
  const {productErrorMsg,productsList,categories}=useSelector(productSelector);
  const {cartSuccessMsg,cartErrorMsg}=useSelector(cartSelector);
  const [filterState,setFilterState]=useState(0); // State variable for filter value
  const [checkedState, setCheckedState] = useState([]);
  const [categoryString,setCategoryString]=useState('');
  useEffect(()=>{
    dispatch(getAllCategories())
    dispatch(getProductsList());
    },[])
    useEffect(()=>{
     dispatch(productActions.initializeAdding({productsList}));
     console.log("initializeAdding");
    },[productsList])
    useEffect(()=>{
setCheckedState(()=>{
  // State variable for category checkboxes
  let notChecked;
  if(categories.length>0){
   notChecked=categories.map((category)=>{
    if(category && category.name && category._id){
   return {[category._id]:undefined,
      [category.name]:false}
    }
 
   })
  }
  return notChecked;
})
    },[categories])

  useEffect(()=>{
const categoryStrings = checkedState?.filter(item => Object.values(item)[1] === true)
.map(item => Object.keys(item)[0]);
if(categoryStrings){
  console.log(categoryStrings.toString());
  setCategoryString(categoryStrings.toString());
}

  },[checkedState]);
  useEffect(()=>{
//dispatch filter action
dispatch(filterProducts({filterState,categoryString}));
  },[filterState,categoryString])
    useEffect(()=>{
      if(cartSuccessMsg){
        toast.success(cartSuccessMsg);
      }
      if(cartErrorMsg){
        toast.error(cartErrorMsg);
      }
      if(productErrorMsg){
        toast.error(productErrorMsg);
      }
      setTimeout(() => {
        dispatch(cartActions.clearMsg());
        dispatch(productActions.clearMsg());
      },3000);
     
    },[cartSuccessMsg,cartErrorMsg,productErrorMsg])
    function changeValue(newVal){
      setFilterState(newVal);
      }
      // Function to handle category checkbox change
      const handleChange = (event) => {
        const { name, checked } = event.target;
        setCheckedState(prevState=>
          prevState.map((option)=>{
            if(Object.keys(option)[1]===name){
             return {...option,[name]:checked}; 
            }else{
             return option
            } 
      })
        );
      
      };
  return (
    <div className='container-fluid'>
        <div className="container-fluid d-flex flex-column align-items-center bg-white">
        {/* input to search product by name */}
       <div className={`${style.input} input-group mb-3 my-3`}>
       <input className="form-control form-control-lg text-primary bg-light border border-primary"
        type="search" placeholder="Search By Name"  
        onChange={(e)=>{dispatch(productActions.handleSearch(e.target.value))}}
        />
</div>
    <div className={`${style.product_container} bg-white p-5 d-flex gap-4`}>
       {productsList && productsList.length>0 && productsList.map((product,index)=>{
       
           return(
               <Card
               key={index}
               product={product}
               index={index}
               />
           )
       })} 
     
    </div>
    <div className={`${style.filterBox}`}>
        <div className={`${style.filter}`}>
          <h5 className='fw-bold text-center'>Filter</h5>
          <label className='fw-bold text-center '>Price:- {filterState}</label>
          <input type="range" min="1" max="100000" step={100} 
          onInput={(e)=>changeValue(e.target.value)}
          />
        </div>
        <div className={``}>
        <h5 className='fw-bold text-center'>Category</h5>
      <div className='text-left px-2'>
      {checkedState && checkedState.map((optionKey,index) => (
   
      <div key={index} className='position-relative'>
       
        <label className=''>
           <input
         className={`${style.checkboxes} my-1`}
          type="checkbox"
          name={Object.keys(optionKey)[1]}
          checked={checkedState[Object.keys(optionKey)[1]]}
          onChange={handleChange}
        />
          <h6 className='mx-3'> {Object.keys(optionKey)[1]}</h6>
        </label>
         <br/>
       </div>
      ))}
     
      </div>
   </div>
   {/* container end  */}
   </div>
   </div>
   </div>
  )
}

export default ProdductsList
