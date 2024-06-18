import { Navigate } from "react-router-dom"
import { useAuthStore } from "../Store/Store"

export const Protect = ({children}) => {
    const {auth}=useAuthStore((state)=>state)
    // const {auth}=useAuthStore(state=>{state})
    if(!auth.username){
        return <Navigate to={'/'} replace={true}/>
    }
  return (
    children
  )
}
export const Authorization = ({ children }) => {
    const token = localStorage.getItem('auth-token');

    if(!token){
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children;
}
