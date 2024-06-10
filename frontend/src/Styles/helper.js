import axios from 'axios'
axios.defaults.baseURL=process.env.REACT_APP_SERVER_DOMAIN;
/*Authenticate */
export async function authenticate(username){
    try {
        return await axios.post.get('/api/auth/authenticate',{username})
    } catch (error) {
        return {error:"Username does not exits"};
    }
}

/*Get user */
export async function getuser({username}){
    try {
        const {data}=await axios.get(`api/auth/getuser/${username}`)
        return data;
    } catch (error) {
        return Promise.reject({error});
    }
}
/*Register user */
export async function registeruser(credentials){
    try {
        const {data:{msg},status}=await axios.post(`api/auth/register`,credentials)
        const {username,email}=credentials;
        if(status==200){
            await axios.post('api/auth/registermail',{username,userEmail:email,txt:msg})
        }

        return Promise.resolve(msg) ``;
    } catch (error) {
        return Promise.reject({error});
    }
}
/* Login*/
export async function login(credential){
    try {
        const {username,password}=credential;
        const {data}= await axios.post('/api/auth/login',{name:username,password:password})
        return Promise.resolve({data});
    } catch (error) {
        return Promise.reject({error});
    }
}
/* UpdateUser*/
export async function updateUser(response){
    try {
        const token=await localStorage.getItem('auth-token');
        // const {data}= await axios.post('/api/auth/updateuser',response,{headers:{"auth-token":`Bearer ${token}`}})
        const {data}= await axios.post('/api/auth/updateuser',response,{headers:{"auth-token":`${token}`}})
        return Promise.resolve({data});
    } catch (error) {
        return Promise.reject({error:"Coudn't update"});
    }
}
/* generate otp*/
export async function generateotp(username){
    try {
        const token=await localStorage.getItem('auth-token');
        // const {data}= await axios.post('/api/auth/updateuser',response,{headers:{"auth-token":`Bearer ${token}`}})
        const {data:{code},status}= await axios.get('/api/auth/verifyotp',{parms:{username}})
        if(status==200){
            let {data:{email}}= await getuser({username});
            let text=`Your Password OTP is ${code}.Verify and recover your password`;
            await axios.post('api/auth/registermail',{username,userEmail:email,text,subject:"Pssword recovery OTP"});
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({error:"Coudn't update"});
    }
}

/*Verify OTP */
export async function verifyotp({username,code}){
    try {
        
        const {data,status}=await axios.get('api/auth/verifyotp',{param:{username,code}});
        return {data,status};
    } catch (error) {
        return Promise.reject({error});
    }
}
/*Reset Password */
export async function resetpassword({username,password}){
    try {
        
        const {data,status}=await axios.get('api/auth/resetPassword',{username,password});
        return {data,status};
    } catch (error) {
        return Promise.reject({error});
    }
}