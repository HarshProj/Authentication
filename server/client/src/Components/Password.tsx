// import React from 'react'
import profileimg from '../assets/user.png'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../Styles/Username.module.css'
import toast , { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import useFetch from '../hooks/fetch.tsx'
import {useAuthStore} from '../Store/Store'
import {passwordvalidate} from '../helper/Validate.tsx'
import { login } from '../helper/helper.tsx';
const Password = () => {
  
  const {auth}=useAuthStore((state)=>state);
  const [{isLoading,apiData,serverError}]= useFetch(`/getuser/${auth.username}`);
  // console.log(apiData.name)
  const path=useNavigate();
  const formik=useFormik({
    initialValues : {
    Password:'admi@'
    },
    validate:passwordvalidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit : async values =>{
      // path('/profile')
      const pwdverification=login({username:auth.username,password:values.Password})
      toast.promise(pwdverification,{
        loading:'Verifying',
        success:<b>Login Successfully</b>,
        error:<b>Password Not matched</b>
      })
      pwdverification.then(res=>{
        let {authtoken}=res.data;
        localStorage.setItem('auth-token',authtoken);
        path('/profile');
      }
      )
      // console.log(values)
    }
  })
  if(isLoading){
    return (
    <div className="flex h-screen w-full justify-center items-center">

    <h1 className="text-2xl font-bold">isLoading ...</h1>
    </div>)
  }
  if(serverError){
    return (
      <div className="flex h-screen w-full justify-center items-center">
  
  <h1 className="text-xl,text-red-500">{serverError.message}</h1>
      </div>)
  }
  return (
    <div className="flex h-screen justify-center">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div className={styles.glass} >
      <div className=" flex flex-col  items-center w-100">
        <h4 className='text-4xl font-bold '>Hello {apiData?.name}</h4>
        <p className='mt-2'>Explore More with connecting with us</p>
      </div>
      <form className='py-1' onSubmit={formik.handleSubmit}>
        <div className="profile flex justify-center py-4">
          <img src={apiData?.profile||profileimg} className={styles.profile_img} alt="avtar" />
        </div>
        <div className="textbox flex flex-col items-center gap-6 ">
          {/* {...formik.getFieldProps('Username')} */}
          <input type="password" {...formik.getFieldProps('Password')} className={styles.text_box} placeholder='Password'  />
          <button   className={styles.btn}>Sign in</button>
        </div>
        <div className="text-center py-4">
          <span className="text-gray-500">Forget passwords ?<Link className='text-red-500' to='/recovery'>Recover Now</Link></span>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Password
