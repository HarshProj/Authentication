// import {useEffect}from 'react'
import profileimg from '../assets/user.png'
import { Link, useNavigate} from 'react-router-dom'
import styles from '../Styles/Username.module.css'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import {useAuthStore} from '../Store/Store'

import {uservalidation} from '../helper/Validate.tsx'
const Username = () => {
  const {setusername}=useAuthStore((state)=>state);
  // e.preventdefault()
  // useEffect(() => {
  //   console.log(auth.username);
    
  // })
  
  const path=useNavigate();
  const formik=useFormik({
    initialValues : {
    Username:''
    },
    validate:uservalidation,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit :  (values) =>{
      // console.log(values);
      setusername(values.Username)
        path('/password')
    }
  })
  // console.log(formik.values)
  // const submi=()=>{
  // }
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
          
          <input type="text" {...formik.getFieldProps('Username')} className={styles.text_box} placeholder='Username'  />
          <button  className={styles.btn}>Lets go</button>
        </div>
        <div className="text-center py-4">
          <span className="text-gray-500"> Not a member ?<Link className='text-red-500' to='/register'>Register Now</Link></span>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Username
