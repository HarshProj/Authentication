import React from 'react'
import profileimg from '../assets/user.png'
import { Link } from 'react-router-dom'
import styles from '../Styles/Username.module.css'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import {passwordvalidate} from '../helper/Validate.tsx'
const Recovery = () => {

  const formik=useFormik({
    initialValues : {
    Password:' '
    },
    validate:passwordvalidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit : async values =>{
      console.log(values)
    }
  })
  return (
    <div className="flex h-screen justify-center">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div className={styles.glass} >
      <div className=" flex flex-col  items-center w-100">
        <h4 className='text-4xl font-bold '>Recovery</h4>
        <p className='mt-2'>Enter OTP to recover the password</p>
      </div>
      <form className='pt-20' onSubmit={formik.handleSubmit}>
        <div className="profile flex justify-center py-4">
          <span className='py-4 text-sm text-left text-gray-500'>Enetr 6 digit OTP sent to your email</span>
        </div>
        <div className="textbox flex flex-col items-center gap-6 ">
          {/* {...formik.getFieldProps('Username')} */}
          <input type="text"className={styles.text_box} placeholder='OTP'  />
          <button type='submit' className={styles.btn}>Recovery</button>
        </div>
        <div className="text-center py-4">
          <span className="text-gray-500">Can't get OTP ?<Link className='text-red-500' to='/register'>Resend</Link></span>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Recovery
