import axios from 'axios'
import {useEffect, useState} from 'react'
axios.defaults.baseURL="http://localhost:5000";
import { getusername } from '../helper/helper';
//custom hook created
export default function useFetch(querry:any){
    const [getData,setData]=useState({isLoading:false,apiData:undefined,status:null,serverError:undefined});

    useEffect(()=>{
        // if(!querry){
        //     return ;
        // }
        const fetchdata=async()=>{
            try {
                setData((prev)=>({...prev,isLoading:true}))
                const x=querry===''?await getusername():'';
                console.log(x)
                // const name=!querry?(x.user.name):'';
                //querry===''? await axios.get(`/api/auth/getuser/${x.user.name}`):
                const {data,status}= await axios.get(`/api/auth${querry}`);
                if(status==200){
                    setData((prev:any)=>({...prev,isLoading:false,apiData:data.info}))
                    setData((prev:any)=>({...prev,status:status}))
                    }
                    setData((prev)=>({...prev,isLoading:false}))
                    
            } catch (error) {
                setData((prev:any)=>({...prev,isLoading:false,serverError:error}))
            }
        }
        fetchdata()
    },[querry])
    return [getData,setData]
}