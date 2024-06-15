import React from 'react'
import profileimg from '../assets/user.png'
import { Link } from 'react-router-dom'
import styles from '../Styles/Username.module.css'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import {resetpasswordvalidate} from '../helper/Validate.tsx'
const Reset = () => {

  const formik=useFormik({
    initialValues : {
    Password:' admin@123',
    CPassword:' admin@13'
    },
    validate:resetpasswordvalidate,
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
        <h4 className='text-4xl font-bold '>RESET</h4>
        <p className='mt-2'>Enter your new password</p>
      </div>
      <form className='pt-20' onSubmit={formik.handleSubmit}>
        
        <div className="textbox flex flex-col items-center gap-6 ">
          {/* {...formik.getFieldProps('Username')} */}
          <input type="text" {...formik.getFieldProps('Password')} className={styles.text_box} placeholder='Password'  />
          <input type="text" {...formik.getFieldProps('CPassword')} className={styles.text_box} placeholder='CPassword'  />
          <button  className={styles.btn}>Sign in</button>
        </div>
        <div className="text-center py-4">
          <span className="text-gray-500">Forget passwords ?<Link className='text-red-500' to='/recovery'>Recover Now</Link></span>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Reset
