import React from 'react'
import profileimg from '../assets/user.png'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../Styles/Username.module.css'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import {passwordvalidate} from '../helper/Validate.tsx'
const Password = () => {
  const path=useNavigate();
  const formik=useFormik({
    initialValues : {
    Password:'admi@'
    },
    validate:passwordvalidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit : async values =>{
      path('/profile')
      console.log(values)
    }
  })
  return (
    <div className="flex h-screen justify-center">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div className={styles.glass} >
      <div className=" flex flex-col  items-center w-100">
        <h4 className='text-4xl font-bold '>Hello Frnd</h4>
        <p className='mt-2'>Explore More with connecting with us</p>
      </div>
      <form className='py-1' onSubmit={formik.handleSubmit}>
        <div className="profile flex justify-center py-4">
          <img src={profileimg} className={styles.profile_img} alt="avtar" />
        </div>
        <div className="textbox flex flex-col items-center gap-6 ">
          {/* {...formik.getFieldProps('Username')} */}
          <input type="password" {...formik.getFieldProps('Password')} className={styles.text_box} placeholder='Password'  />
          <button type='submit' style={{backgroundColor:'rgb(99 102 241)'}}  className={styles.btn}>Sign in</button>
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
