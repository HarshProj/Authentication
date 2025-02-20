import  { useEffect, useState } from 'react'
// import profileimg from '../assets/user.png'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../Styles/Username.module.css'
import toast, { Toaster } from 'react-hot-toast';
// import { useFormik } from 'formik';

// import {passwordvalidate} from '../helper/Validate.tsx'
import { useAuthStore } from '../Store/Store.tsx';
import { generateotp, verifyotp } from '../helper/helper.tsx';
const Recovery = () => {
  const {auth}=useAuthStore((state)=>state);
  const navigate=useNavigate();
  const [OTP,setotp]=useState("");
  useEffect(()=>{
    let sendPromise=generateotp(auth.username);
    toast.promise(sendPromise,{
      loading:'Sending...',
      success:<b>OTP has been send to your mail</b>,
      error:<b>Could Not send OTP</b>
    })
  },[auth.username])

  async function onsubmit(e:any){
    e.preventDefault();
    try {
      let {status}= await verifyotp({username:auth.username,code:OTP})
      console.log(status)
      if(status==201){
        toast.success("Verified Successfully");
        return navigate('/reset');
      }
      else{
        return toast.error('Wrong OTP vheck email again');

      }
    } catch (error) {
      
      return toast.error('Wrong OTP vheck email again');
    }
  }
  function resendotp(e:any){
    e.preventDefault();
    let sendPromise=generateotp(auth.username);
    toast.promise(sendPromise,{
      loading:'Sending...',
      success:<b>OTP has been send to your mail</b>,
      error:<b>Could Not send OTP</b>
    })
  }
  return (
    <div className="flex h-full justify-center">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div className={styles.glass} >
      <div className=" flex flex-col  items-center w-100">
        <h4 className='text-4xl font-bold '>Recovery</h4>
        <p className='mt-2'>Enter OTP to recover the password</p>
      </div>
      <form className='pt-20' onSubmit={onsubmit}>
        <div className="profile flex justify-center py-4">
          <span className='py-4 text-sm text-left text-gray-500'>Enetr 6 digit OTP sent to your email</span>
        </div>
        <div className="textbox flex flex-col items-center gap-6 ">
          {/* {...formik.getFieldProps('Username')} */}
          <input type="text" onChange={(e)=>{setotp(e.target.value)}} className={styles.text_box} placeholder='OTP'  />
          <button className={styles.btn} >Recovery</button>
        </div>
      </form>
        <div className="text-center py-4">
          <span className="text-gray-500">Can't get OTP ?<Link className='text-red-500' to='/register' onClick={resendotp}>Resend</Link></span>
        </div>
    </div>
    </div>
  )
}

export default Recovery
