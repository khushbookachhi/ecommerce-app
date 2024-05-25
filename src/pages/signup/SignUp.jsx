import {useNavigate } from 'react-router-dom';

import style from './SignUp.module.css'; 
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpAsync, userActions, userSelector } from '../../redux/reducers/userReducers';


function SignUp(){
   const [name,setName]=useState(""); // State variable for storing name input value
   const [email,setEmail]=useState(""); // State variable for storing email input value
   const [password,setPassword]=useState(""); // State variable for storing password input value
   const [userType,setUserType]=useState("seller");
   const navigate=useNavigate();
   const dispatch=useDispatch();
   const {successMsg,errorMsg}=useSelector(userSelector);
   // Effect to handle success and error messages
   useEffect(()=>{
      if(successMsg){
       setTimeout(() => {
         navigate('/signin');
         dispatch(userActions.clearMsg());
       },3000);
      }
      // eslint-disable-next-line
      },[successMsg])
        // Function to validate input fields
   function isValidInput(name,email,password){
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const passwordFormat=!(/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password));
      
      if(name.length>0 && emailRegex.test(email) &&( password.length>=8 && !passwordFormat)){
         return true
      }else{
         return false;
      }
     } 
     function signUpOnSubmit(){
      const isValid=isValidInput(name,email,password);
      if(isValid){
     console.log(name,' ',email,' ',password,' ',userType);
     dispatch(signUpAsync({name,email,password,userType}));
     }

     }
return(
   <>
   <div className={`${style.signin} container my-5`}>
   <h1 className='fw-bold my-5'>Sign Up</h1>
   {/* form to submit user data */}
   <form className='container' 
   onSubmit={(e)=>{e.preventDefault(); signUpOnSubmit()}}
   >
   <div className="mb-3">
      {/* input for name  */}
   <input type="text" className="form-control border-primary border-1" placeholder='Enter Name' required
    onChange={(e)=>{setName(e.target.value);}}/>
 </div>
 <div className="mb-3">
    {/* input for email  */}
   <input type="email" className="form-control border-primary border-1" placeholder='Enter Email' required
   onChange={(e)=>{setEmail(e.target.value);}}/>
 </div>
 <div className="mb-3">
    {/* input for password  */}
   <input type="password" className="form-control border-primary border-1" placeholder='Enter Password' required
    onChange={(e)=>{setPassword(e.target.value);}}/>
 </div>
 <h5>Are You Seller Or Customer ?</h5>
 <div>
 <label className='fw-semibold fs-5'>
      <input type="radio" name="UserType" value="seller"
       onChange={(e)=>{setUserType(e.target.value);}}/>
      Seller
    </label>
 </div>
 <div className="mb-3">
 <label className='fw-semibold fs-5'>
      <input type="radio" name="UserType" value="customer"
      onChange={(e)=>{setUserType(e.target.value);}}/>
      Customer
    </label>
 </div>
 {/* submit button  */}
 <button type="submit" className={` ${style.button} btn btn-primary`}>Sign Up</button>
</form>

   </div>
   </>
)
}
export default SignUp;