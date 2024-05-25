import axios from "axios";
const instance=axios.create({
    baseURL:'https://seven-e-commerce-api.onrender.com/api',
});

instance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response && error.response.status === 401){
            localStorage.removeItem('user');
            localStorage.removeItem('userID');
            localStorage.removeItem('userName');
            localStorage.removeItem('userType');
            delete axios.defaults.headers.common['Authorization'];
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);
export default instance;