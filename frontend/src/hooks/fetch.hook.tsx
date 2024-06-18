import axios from 'axios'
import {useEffect, useState} from 'react'
axios.defaults.baseURL="http://localhost:5000";
import { getusername } from '../helper/helper';
//custom hook created
import {jwtDecode} from 'jwt-decode'
export default function useFetch(querry:any){
    const [getData,setData]=useState({isLoading:false,apiData:undefined,status:null,serverError:undefined});

    useEffect(()=>{
        // if(!querry){
        //     return ;
        // }
        const fetchdata=async()=>{
            try {
                setData((prev)=>({...prev,isLoading:true}))
                
                const token= localStorage.getItem("auth-token");
                let x;
                if(token){
                    
                    const decode= jwtDecode(token);
                    x=querry===undefined?decode.user.name:'';
                    // const name=!querry?(x.user.name):'';
                    //querry===''? await axios.get(`/api/auth/getuser/${x.user.name}`):
                }
                const {data,status}=querry===undefined?await axios.get(`/api/auth/getuser/${x}`): await axios.get(`/api/auth${querry}`);
                // console.log(querry,data,status)
                if(status==200){
                    setData((prev:any)=>({...prev,isLoading:false,apiData:data.data}))
                    setData((prev:any)=>({...prev,status:status})) 
                    }
                    setData((prev)=>({...prev,isLoading:false}))
                    console.log(getData);
                    
            } catch (error) {
                setData((prev:any)=>({...prev,isLoading:false,serverError:error}))
            }
        }
        fetchdata()
    },[querry])
    return [getData,setData]
}