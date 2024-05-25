import { Fragment } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/signup/SignUp";
import { store } from "./redux/store";
import ProdductsList from "./pages/productsList/ProdductsList";
import AddProduct from "./pages/addProduct/AddProduct";
import MyProduct from "./pages/myProduct/MyProduct";
import Cart from "./pages/cart/Cart";
import MyOrder from "./pages/myOrders/MyOrder";
import Review from "./pages/reviews/Review";
import UpdateProduct from "./pages/updateProduct/UpdateProduct";
function App() {
 

  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
    <NavBar />
        <Routes>
          <Route path="/" element={<ProdductsList/>}>
          </Route>
          <Route path="/signin" element={<SignIn/>}>
          </Route>
          <Route path="/signup" element={<SignUp/>}>
          </Route>
          <Route path="/addProduct" element={<AddProduct/>}>
          </Route>
          <Route path="/myProduct" element={<MyProduct/>}></Route>
          <Route path="/myOrders" element={<MyOrder/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/reviews" element={<Review/>}></Route>
          <Route path="/updateProduct" element={<UpdateProduct/>}></Route>
         
        </Routes>
       
        </BrowserRouter>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false}
                      newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss
                      draggable pauseOnHover />
        </Provider>
    </>
  )
}

export default App
