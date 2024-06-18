import  { useState } from 'react'
import profileimg from '../assets/user.png'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../Styles/Username.module.css'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import  {converttobase64} from '../helper/Convert.tsx'
import {validateprofile} from '../helper/Validate.tsx'
import useFetch from '../hooks/fetch.tsx';
// import { useAuthStore } from '../Store/Store.tsx';
import { updateUser } from '../helper/helper.tsx';
const Profile = () => {
  const [file,setFile]=useState();
  // const {auth}=useAuthStore((state)=>state);
  // const [{isLoading,apiData,serverError}]=useFetch(`/getuser/${auth.username}`);
  const [{isLoading,apiData,serverError}]=useFetch('');
  console.log(apiData)
  const navigate=useNavigate();
  const formik=useFormik({
    initialValues : {
      firstname:apiData?.firstname||'',
      lastname:apiData?.lastname||'',
      mobile:apiData?.mobile||'',
      email:apiData?.email||'',
      address:apiData?.address||''
    },
    enableReinitialize:true,
    validate:validateprofile,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit : async values =>{
      values=await Object.assign(values,{profile:file ||apiData?.profile|| ''});
      const pwdverification=updateUser(values)
      toast.promise(pwdverification,{
        loading:'Updating',
        success:<b>Successfully Updated</b>,
        error:<b>unable to update</b>
      })
      // console.log(values)
    }
  })
  const  onupload=async (e:any) =>{
    const base64:any=await converttobase64(e.target.files[0]);
    setFile(base64);
  }
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
    <div className="flex h-screen justify-center ">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div className={styles.glass} style={{width:"45%",paddingTop:'3rem'}} >
      <div className=" flex flex-col  items-center w-100">
        <h4 className='text-4xl font-bold '>Profile</h4>
        <p className='mt-2'>You can update Your profile</p>
      </div>
      <form className='flex flex-col gap-4  items-center py-1 ' onSubmit={formik.handleSubmit}>
        <div className="profile flex justify-center py-4">
          <label htmlFor="profile">
          <img src={apiData?.profile ||file || profileimg} className={styles.profile_img} alt="avtar" />

          </label>
          <input onChange={onupload} type='file' id='profile' name='profile'/>
        </div>
        <div className="flex w-3/4 gap-10">
          <input type="text" {...formik.getFieldProps('firstname')} className={styles.text_box} placeholder='FirstName'  />
          <input type="text" {...formik.getFieldProps('lastname')} className={styles.text_box} placeholder='LastName'  />

        </div>
        <div className="textbox flex w-3/4 gap-6 ">

          <input type="text" {...formik.getFieldProps('mobile')} className={styles.text_box} placeholder='Mobile'  />
          <input type="email" {...formik.getFieldProps('email')}  className={styles.text_box} placeholder='Email'  />
        </div>
        <div className="flex w-full justify-center">
          <input type="text" {...formik.getFieldProps('address')} className={styles.text_box} placeholder='Address'  />

        </div>
          <button  className={styles.btn}>Update</button>
        <div className="text-center py-4">
          <span className="text-gray-500">Came back later?<Link className='text-red-500' onClick={()=>{localStorage.removeItem('auth-token') ,navigate('/')}} to='/'>Log out</Link></span>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Profile
