import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../api.js';

const initialState={
    cartItemsList:[],
    orders:[],
    cartTotalPrice:0,
    purchase:false,
    editItem:null,
    cartProductID:null,
    cartQuantity:0,
    removing:[],
    cartErrorMsg:null,
    cartSuccessMsg:null

}
export const addToCart=createAsyncThunk("cart/add",async(payload,{rejectWithValue})=>{
try {
    const product =await axios.get(`/cartItems/getByProductID/${payload.productID}`);
    if(product.data){
        console.log("Product already exists !");
        return "Go To Cart product already exist !";
    }
   const response= await axios.post("/cartItems", {
        productID:payload.productID
    });
    console.log("Product Added to Cart ",response);
    return "Product Added to Cart !";
} catch (error) {
    return rejectWithValue(error.message);
}
})
export const getCartItems=createAsyncThunk("cart/get",async(_,{rejectWithValue})=>{
    try {
        const response= await axios.get("/cartItems");
        console.log("Product From Cart ",response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message); 
    }
})
export const deleteCartItems=createAsyncThunk("cart/delete",async(payload,{rejectWithValue})=>{
    try {
        console.log(payload.cartID);
        const response=await axios.delete(`/cartItems/${payload.cartID}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message); 
    }
})
export const createOrders=createAsyncThunk("cart/createOrder",async(_,{rejectWithValue})=>{
    try {
        const response=await axios.post("/orders");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message); 
    }
})
export const getOrders=createAsyncThunk("cart/getOrders",async(_,{rejectWithValue})=>{
    try {
        const response=await axios.get("/orders");
        return response.data; 
    } catch (error) {
        return rejectWithValue(error.message);  
    }
})
export const updateQuantity=createAsyncThunk("cart/update",async(payload,{rejectWithValue})=>{
   
    try {
        const response=await axios.put("/cartItems/updateCart",
          {  quantity:payload.quantity,
            cartID:payload.cartID}
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);   
    }
})

const cartSlice=createSlice({
name:'cart',
initialState,
reducers:{
    clearMsg:(state)=>{ // Action to clear success and error messages
        state.cartSuccessMsg=null;
        state.cartErrorMsg=null;
       },
       initializeRemoving:(state,action)=>{
        state.removing=new Array(action.payload.cartItemsList.length).fill(false);
      },
      setRemoving:(state,action)=>{   
          const {index,isBoolean}=action.payload;
          const newState=[...state.removing]; //new Array(products.length).fill(false)
          console.log("newState ",newState);
          if (index >= -1 && index < newState.length) { // Check index bounds
              newState[index] = isBoolean === "true";
              state.removing=newState;
              console.log(isBoolean === "true");
            } else {
              console.error("Invalid index:", index);
            }
          },
       setPurchase:(state)=>{
        state.purchase=!state.purchase;
    },
    totalPrice:(state)=>{
        let totalPrice=0;
        const cartItems=state.cartItemsList;
        cartItems.forEach((item=>{
            totalPrice+=item.productID.price*item.quantity;
        }))
        state.cartTotalPrice=totalPrice;
    },
    setEditItem:(state,action)=>{
state.editItem=action.payload.product
state.cartQuantity=action.payload.cartQuantity
state.cartProductID=action.payload.cartID    }
},
extraReducers:(builder)=>{
    builder.addCase(addToCart.fulfilled,(state,action)=>{
       return{
           ...state,
           cartSuccessMsg:action.payload,
           cartErrorMsg:null
       }
    })
    .addCase(addToCart.rejected,(state)=>{
        const {payload}=action;
        const errorMessage = typeof payload === 'string' ? payload : 'Error:Check Credential!';
        console.log(errorMessage);
        return{
            ...state,
            cartSuccessMsg:null,
            cartErrorMsg:errorMessage
        }  
     })
     .addCase(getCartItems.fulfilled,(state,action)=>{
        const {payload}=action;
        return{
            ...state,
            cartItemsList:payload
        }  
     })
     .addCase(getCartItems.rejected,(state)=>{
        const {payload}=action;
        const errorMessage = typeof payload === 'string' ? payload : 'Error:Check Credential!';
        console.log(errorMessage);
        return{
            ...state,
            cartSuccessMsg:null,
            cartErrorMsg:errorMessage
        }  
     })
     .addCase(deleteCartItems.fulfilled,(state,action)=>{
        const {payload}=action;
        return{
            ...state,
            cartSuccessMsg:payload,
            cartErrorMsg:null
        }
     })
     .addCase(deleteCartItems.rejected,(state,action)=>{
        const {payload}=action;
        const errorMessage = typeof payload === 'string' ? payload : 'Error:Check Credential!';
        console.log(errorMessage);
        return{
            ...state,
            cartSuccessMsg:null,
            cartErrorMsg:errorMessage
        } 
     })
     .addCase(createOrders.fulfilled,(state,action)=>{
        return{
            ...state,
            cartSuccessMsg:action.payload,
            cartErrorMsg:null
        }
     })
     .addCase(createOrders.rejected,(state,action)=>{
        const {payload}=action;
        const errorMessage = typeof payload === 'string' ? payload : 'Error:Check Credential!';
        console.log(errorMessage);
        return{
            ...state,
            cartSuccessMsg:null,
            cartErrorMsg:errorMessage
        } 
     })
     .addCase(getOrders.fulfilled,(state,action)=>{
        return{
            ...state,
            orders:action.payload
        }
     })
     .addCase(getOrders.rejected,(state,action)=>{
        const {payload}=action;
        const errorMessage = typeof payload === 'string' ? payload : 'Error:Check Credential!';
        console.log(errorMessage);
        return{
            ...state,
            cartSuccessMsg:null,
            cartErrorMsg:errorMessage
        } 
     })
     .addCase(updateQuantity.fulfilled,(state,action)=>{
        return{
            ...state,
            cartSuccessMsg:action.payload,
            cartErrorMsg:null
        }
     })
     .addCase(updateQuantity.rejected,(state,action)=>{
        const {payload}=action;
        const errorMessage = typeof payload === 'string' ? payload : 'Error:Check Credential!';
        console.log(errorMessage);
        return{
            ...state,
            cartSuccessMsg:null,
            cartErrorMsg:errorMessage
        } 
     })
}
})

// Exporting reducer and actions
export const cartReducer=cartSlice.reducer;
export const cartActions=cartSlice.actions;

// Selector to retrieve cart state from the Redux store
export const cartSelector=(state)=>state.cartReducer;

