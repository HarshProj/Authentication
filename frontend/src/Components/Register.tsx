import React, { useState } from 'react'
import profileimg from '../assets/user.png'
import { Link } from 'react-router-dom'
import styles from '../Styles/Username.module.css'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import  {converttobase64} from '../helper/Convert.tsx'
import {registervalidation} from '../helper/Validate.tsx'
const Register = () => {
  const [file,setFile]=useState();
  const formik=useFormik({
    initialValues : {
      Email:'adfmin@gmail.com',
      Username:'admin',
      Password:'gdgc$h'
    },
    validate:registervalidation,
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
        <h4 className='text-4xl font-bold '>Register</h4>
        <p className='mt-2'>Happy to join You</p>
      </div>
      <form className='py-1' onSubmit={formik.handleSubmit}>
        <div className="profile flex justify-center py-4">
          <label htmlFor="profile">
          <img src={file || profileimg} className={styles.profile_img} alt="avtar" />

          </label>
          <input onChange={onupload} type='file' id='profile' name='profile'/>
        </div>
        <div className="textbox flex flex-col items-center gap-6 ">
          {/* {...formik.getFieldProps('Username')} */}
          <input type="email" {...formik.getFieldProps('Email')} className={styles.text_box} placeholder='Email'  />
          <input type="text" {...formik.getFieldProps('Username')} className={styles.text_box} placeholder='Username'  />
          <input type="text" {...formik.getFieldProps('Password')} className={styles.text_box} placeholder='Password'  />
          <button type='submit' className={styles.btn}>Register</button>
        </div>
        <div className="text-center py-4">
          <span className="text-gray-500">Already Register ?<Link className='text-red-500' to='/'>Login Now</Link></span>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Register
