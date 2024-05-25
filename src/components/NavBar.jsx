import { Link, useNavigate } from "react-router-dom";

import bag from '../icons/bag.png';
import cart from '../icons/cart.png';
import signin from '../icons/signin.png';
import logout from '../icons/exit.png';
import { useDispatch, useSelector } from "react-redux";
import { userActions, userSelector } from "../redux/reducers/userReducers";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from '../../src/redux/api.js';
function NavBar() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {userToken,userType,successMsg,errorMsg}=useSelector(userSelector);
 useEffect(()=>{
  if(userToken){
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
  }
console.log("authorization header set");
 },[userToken])
  useEffect(()=>{
    if(successMsg){
   toast.success(successMsg);
   setTimeout(() => {
     navigate('/');
     dispatch(userActions.clearMsg());
   },3000);
  }
  if(errorMsg){
   toast.error(errorMsg);
  }
  },[successMsg,errorMsg])
    return ( 
        <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <Link className="navbar-brand text-primary fs-4" to="/">
  Ecommerce-Web
    </Link>
   
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5 fw-semibold">
        {/* <li className="nav-item">
          <Link className="d-flex nav-link text-primary active" aria-current="page" to="/">
          <img className='mx-2' src={house} alt="house" style={{"width":"2rem"}}/>
            Home</Link>
        </li> */}
      
          {userType==="seller"? <li className="nav-item">
          <Link className="d-flex nav-link text-primary active" aria-current="page" to="/myProduct">
          <img className='mx-2' src={bag} alt="bag" style={{"width":"2rem"}}/>
            MyProducts</Link>
        </li>: null}
        {(userType==='seller' && userToken) &&  <li className="nav-item">
          <Link className="d-flex nav-link text-primary active" aria-current="page" to="/addProduct">
          <img className='mx-2' src={bag} alt="bag" style={{"width":"2rem"}}/>
            Add Product</Link>
        </li>}
       
       {(userType==='customer' && userToken) && <li className="nav-item">
          <Link className="d-flex nav-link text-primary active" aria-current="page" to="/myOrders">
          <img className='mx-2' src={bag} alt="bag" style={{"width":"2rem"}}/>
            MyOrders</Link>
        </li>} 
        {(userType==='customer' && userToken) && <li className="nav-item">
          <Link className="d-flex nav-link text-primary active" aria-current="page" to="/cart">
          <img className='mx-2' src={cart} alt="cart" style={{"width":"2rem"}}/>
            Cart</Link>
        </li> }
        {!userToken?
         <li className="nav-item">
         <Link className="d-flex nav-link text-primary active" aria-current="page" to="/signin">
         <img className='mx-2' src={signin} alt="signin" style={{"width":"2rem"}}/>
           SignIn</Link>
       </li>:
        <li className="nav-item">
        <Link className="d-flex nav-link text-primary active" aria-current="page" 
        onClick={()=>dispatch(userActions.signOut())}>
        <img className='mx-2' src={logout} alt="logout" style={{"width":"2rem"}}/>
          Logout</Link>
      </li>
       }
       
        
      </ul>
{/* //search  */}
    </div>
  </div>
</nav>
        </>
     );
}

export default NavBar;