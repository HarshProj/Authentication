import React, { useState } from 'react'
import profileimg from '../assets/user.png'
import { Link } from 'react-router-dom'
import styles from '../Styles/Username.module.css'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import  {converttobase64} from '../helper/Convert.tsx'
import {validateprofile} from '../helper/Validate.tsx'
const Profile = () => {
  const [file,setFile]=useState();
  const formik=useFormik({
    initialValues : {
      Firsrname:'',
      Lastname:'admin',
      Mobile:'gdgc$h',
      Email:'',
      Address:''
    },
    validate:validateprofile,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit : async values =>{
      values=await Object.assign(values,{property:file || ''});
      console.log(values)
    }
  })
  const  onupload=async (e:any) =>{
    const base64:any=await converttobase64(e.target.files[0]);
    setFile(base64);
  }
  return (
    <div className="flex h-screen justify-center">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div className={styles.glass} style={{width:"45%",paddingTop:'3rem'}} >
      <div className=" flex flex-col  items-center w-100">
        <h4 className='text-4xl font-bold '>Profile</h4>
        <p className='mt-2'>You can update Your profile</p>
      </div>
      <form className='flex flex-col gap-4  items-center py-1 ' onSubmit={formik.handleSubmit}>
        <div className="profile flex justify-center py-4">
          <label htmlFor="profile">
          <img src={file || profileimg} className={styles.profile_img} alt="avtar" />

          </label>
          <input onChange={onupload} type='file' id='profile' name='profile'/>
        </div>
        <div className="flex w-3/4 gap-10">
          <input type="text" {...formik.getFieldProps('Firstname')} className={styles.text_box} placeholder='FirstName'  />
          <input type="text" {...formik.getFieldProps('Lastname')} className={styles.text_box} placeholder='LastName'  />

        </div>
        <div className="textbox flex w-3/4 gap-6 ">

          <input type="text" {...formik.getFieldProps('Phoneno')} className={styles.text_box} placeholder='Mobile'  />
          <input type="email" {...formik.getFieldProps('Email')} className={styles.text_box} placeholder='Email'  />
        </div>
        <div className="flex w-full   justify-center">
          <input type="text" {...formik.getFieldProps('Address')} className={styles.text_box} placeholder='Address'  />

        </div>
          <button type='submit' className={styles.btn}>Update</button>
        <div className="text-center py-4">
          <span className="text-gray-500">Came back later?<Link className='text-red-500' to='/'>Log out</Link></span>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Profile
