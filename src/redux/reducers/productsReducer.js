import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../api.js';


const initialState={
    categories:[],
    productsList:[],
    copyProductsList:[],
    userProducts:[],
    reviews:[],
    adding:[],
    updateProduct:null,
    productID:localStorage.getItem('productID')||null,
    loading:false,
    productErrorMsg:null,
    productSuccessMsg:null
}
// initialState.adding = new Array(initialState.productsList.length).fill(false);

export const getAllCategories=createAsyncThunk("product/Categories",async(_,{rejectWithValue})=>{
    try {
        const response=await axios.get("/products/getAllCategories");
        return response.data; 
    } catch (error) {
        return rejectWithValue(error.message);
    }
})
export const postProducts=createAsyncThunk("product/postProduct",async(payload,{rejectWithValue})=>{
    
    const {productName,file,price,productCategories,stock,sizes}=payload;
    try {
        const formData=new FormData();
        formData.append('name',productName);
        formData.append('imageUrl',file);
        formData.append('price',price);
        formData.append('stock',stock);
        formData.append('sizes',sizes);
        formData.append('categories',productCategories);
        const response=await axios.post("/products",formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        console.log(response);
        return ;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
export const updateProducts=createAsyncThunk("product/updateProduct",async(payload,{rejectWithValue})=>{
    
    const {productID,productName,file,price,productCategories,stock,sizes}=payload;
    try {
        const formData=new FormData();
        formData.append('name',productName);
        formData.append('imageUrl',file);
        formData.append('price',price);
        formData.append('stock',stock);
        formData.append('sizes',sizes);
        formData.append('categories',productCategories);
        const response=await axios.put(`/products/updateProduct/${productID}`,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
export const deleteProduct=createAsyncThunk("product/deleteProduct",async(payload,{rejectWithValue})=>{
    const {productID}=payload;
    try {
        const response=await axios.delete(`/products/deleteProduct/${productID}`);
    console.log(response.data);
    return response.data; 
    } catch (error) {
        return rejectWithValue(error.message); 
    }
   
})
export const getProductsByUserID=createAsyncThunk("product/getProductsByuserID",async(_,{rejectWithValue})=>{
    try {
        const response=await axios.get("/products/getProductsByUserID");
        return response.data; 
    } catch (error) {
        return rejectWithValue(error.message);
    }
})
export const getProductsList=createAsyncThunk("product/getProductsList",async(_,{rejectWithValue})=>{
    try {
        const response=await axios.get("/products");
        return response.data; 
    } catch (error) {
        return rejectWithValue(error.message);
    }
})
export const postReviews=createAsyncThunk("product/postReview",async(payload,{rejectWithValue})=>{
    try {
        const response=await axios.post("/products/rate",
        {productID:payload.productID,
        rating:payload.rating}
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message); 
    }
})
export const getReviews=createAsyncThunk("product/getReview",async(payload,{rejectWithValue})=>{
    try {
        const response=await axios.get(`/products/ratings/${payload.productID}`);
        console.log("ratings are got ",response.data);
        return response.data.reviews;
    } catch (error) {
        return rejectWithValue(error.message); 
    }
})
export const filterProducts=createAsyncThunk("product/filter",async(payload,{rejectWithValue})=>{
    const {filterState,categoryString}=payload;
    try {
        let response;
        if(filterState>0 && categoryString.length>0){
         response=await axios.get(`/products/filter`,{
            params:{maxPrice:filterState,categories:categoryString}
         });
        }else if(filterState>0){
            response=await axios.get(`/products/filter`,{
                params:{maxPrice:filterState}
            });   
        }else if(categoryString.length>0){
                response=await axios.get(`/products/filter`,{
                    params:{categories:categoryString}
                    
            });
        }
       
        console.log("filtered products ",response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message); 
    }
})
const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
        setProductID:(state,action)=>{
            localStorage.setItem('productID',action.payload.productID);
           state.productID=localStorage.getItem('productID');
        },
        setUpdateProduct:(state,action)=>{
            state.updateProduct=action.payload.product;
        },
        handleSearch:(state,action)=>{  //handle search in first page
          
            const targetValue=action.payload;
            let filteredProducts ;
            if(targetValue){
            filteredProducts = state.productsList.filter((product) =>
               product.name.toLowerCase().includes(targetValue.toLowerCase())
             );
            }else{
               filteredProducts=state.copyProductsList;
            }
            return {
                ...state,
                productsList: filteredProducts
            }; 
        },
        initializeAdding:(state,action)=>{
          state.adding=new Array(action.payload.productsList.length).fill(false);
        },
        setAdding:(state,action)=>{   
            const {index,isBoolean}=action.payload;
            const newState=[...state.adding]; //new Array(products.length).fill(false)
            console.log("newState ",newState);
            if (index >= -1 && index < newState.length) { // Check index bounds
                newState[index] = isBoolean === "true";
                state.adding=newState;
                console.log(isBoolean === "true");
              } else {
                console.error("Invalid index:", index);
              }
            },
        clearMsg:(state)=>{ // Action to clear success and error messages
            state.productSuccessMsg=null;
            state.productErrorMsg=null;
           }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllCategories.fulfilled,(state,action)=>{
            return{
                ...state,
                categories:action.payload
            }
        })
        .addCase(postProducts.fulfilled,(state)=>{
            return{
                ...state,
                productSuccessMsg:"Product Added to Store !",
                productErrorMsg:null
            }
        })
        .addCase(postProducts.rejected,(state,action)=>{
            const {payload}=action;
            const errorMessage = typeof payload === 'string' ? payload : 'Error:Check Credential!';
            console.log(errorMessage);
            return{
                ...state,
                productSuccessMsg:null,
                productErrorMsg:errorMessage
            }
        })
        .addCase(updateProducts.fulfilled,(state,action)=>{
            return{
                ...state,
                productSuccessMsg:action.payload,
                productErrorMsg:null
            }
        })
        .addCase(updateProducts.rejected,(state,action)=>{
            const {payload}=action;
            const errorMessage = typeof payload === 'string' ? payload : 'Error:Check Credential!';
            console.log(errorMessage);
            return{
                ...state,
                productSuccessMsg:null,
                productErrorMsg:errorMessage
            }
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            return{
                ...state,
                productSuccessMsg:action.payload,
                productErrorMsg:null
            }
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
            const {payload}=action;
            const errorMessage = typeof payload === 'string' ? payload : 'Error:Check Credential!';
            console.log(errorMessage);
            return{
                ...state,
                productSuccessMsg:null,
                productErrorMsg:errorMessage
            }
        })
        .addCase(getProductsByUserID.fulfilled,(state,action)=>{
            return{
                ...state,
                userProducts:action.payload
            }
        })
        .addCase(getProductsList.fulfilled,(state,action)=>{
            return{
                ...state,
                productsList:action.payload,
                copyProductsList:action.payload
            }
        })
        .addCase(postReviews.fulfilled,(state,action)=>{
            return{
                ...state,
                productSuccessMsg:action.payload,
                productErrorMsg:null
            }
        })
        .addCase(postReviews.rejected,(state,action)=>{
            const {payload}=action;
            const errorMessage = typeof payload === 'string' ? payload : 'Error:Check Credential!';
            console.log(errorMessage);
            return{
                ...state,
                productSuccessMsg:null,
                productErrorMsg:errorMessage
            }
        })
        .addCase(getReviews.fulfilled,(state,action)=>{
            return{
                ...state,
                reviews:action.payload
            }
        })
        .addCase(filterProducts.fulfilled,(state,action)=>{
            console.log("filterProucts calling ");
            return{
                ...state,
                productsList:action.payload
            }
        })
        .addCase(filterProducts.rejected,(state,action)=>{
            const {payload}=action;
            const errorMessage = typeof payload === 'string' ? payload : 'Error:Check Credential!';
            console.log(errorMessage);
    
        })
    }
})


// Exporting reducer and actions
export const productReducer=productSlice.reducer;
export const productActions=productSlice.actions;

// Selector to retrieve product state from the Redux store
export const productSelector=(state)=>state.productReducer;