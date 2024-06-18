import axios from 'axios'
// import { import.meta.env } from 'vite';
// axios.defaults.baseURL=import.meta.env.REACT_APP_SERVER_DOMAIN;
import {jwtDecode} from 'jwt-decode'

axios.defaults.baseURL="http://localhost:5000";
/*Authenticate */
export async function authenticate(username:any){
    try {
        // console.log(username)
        const {status}= await axios.post('/api/auth/authenticate',{name:username})
        return {status};
    } catch (error) {
        return {error:"Username does not exits"};
    }
}

/*Get user */
export async function getuser({username}:any){
    try {
        const {data}=await axios.get(`api/auth/getuser/${username}`)
        // console.log(data);
        return data;
    } catch (error) {
        return Promise.reject({error});
    }
}
/*Register user */
export async function registeruser(credentials:any){
    try {
        const {data:{msg},status}=await axios.post(`api/auth/register`,credentials)
        const {Username,Email}=credentials;
        if(status==200){
            await axios.post('api/auth/registermail',{username:Username,useremail:Email,text:msg})
        } 

        return Promise.resolve(msg) ;
    } catch (error) {
        return Promise.reject({error});
    }
}
/* Login*/
export async function login(credential:any){
    try {
        const {username,password}=credential;
        const {data}= await axios.post('/api/auth/login',{name:username,password:password})
        return Promise.resolve({data});
    } catch (error) {
        return Promise.reject({error});
    }
}
/* UpdateUser*/
export async function updateUser(response:any){
    try {
        const token=await localStorage.getItem('auth-token');
        // const {data}= await axios.post('/api/auth/updateuser',response,{headers:{"auth-token":`Bearer ${token}`}})
        const {data}= await axios.put('/api/auth/updateuser',response,{headers:{"auth-token":`${token}`}})
        return Promise.resolve({data});
    } catch (error) {
        return Promise.reject({error:"Coudn't update"});
    }
}
/* generate otp*/
export async function generateotp(name:any){
    try {
        // const token=await localStorage.getItem('auth-token');
        // const {data}= await axios.post('/api/auth/updateuser',response,{headers:{"auth-token":`Bearer ${token}`}})
        const {data:{code},status}= await axios.get('/api/auth/generateotp',{params:{name}})
        console.log(code);
        localStorage.setItem('OTP',code);
        if(status===200){
            let {data}= await getuser({username:name});
            console.log(data.email)
            let text=`Your Password OTP is ${code}.Verify and recover your password`;
            await axios.post('api/auth/registermail',{username:name,useremail:data.email,text,subject:"Pssword recovery OTP"});
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({error:"Coudn't update"});
    }
}

/*Verify OTP */
export async function verifyotp({username,code}:any){
    try {
        
        const {data,status}=await axios.get('api/auth/verifyotp',{params:{name:username,code}});
        return {data,status};
    } catch (error) {
        return Promise.reject({error});
    }
}
/*Reset Password */
export async function resetpassword({username,password}:any){
    try {
        
        const {data,status}=await axios.put('api/auth/resetPassword',{params:{username,password}});
        return {data,status};
    } catch (error) {
        return Promise.reject({error});
    }
}
/* Get user name from the token */
export async function getusername(){
    console.log("Fetchin the token");
    const token= localStorage.getItem("auth-token");
    console.log(token);
    if(!token){
        return Promise.reject("Cannot find token");
    }
    const decode= jwtDecode(token);
    
    console.log("decoded token is",decode)
    return decode;
}