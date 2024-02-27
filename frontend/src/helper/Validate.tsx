import toast from 'react-hot-toast'
import Username from '../Components/Username';
export async function uservalidation(values:any){
    const errors=userverification({},values);

    return errors;
  }
export async function passwordvalidate(values:any){
    const errors=passwordverification({},values);

    return errors;
  }
  /* validaltion for reset */
export async function resetpasswordvalidate(values:any){
    const errors=passwordverification({},values);

    if(values.Password !=values.CPassword){
        errors.exist=toast.error("Password Does not match")
    }
    return errors;
  }
function userverification(errors:any={},values:any){
    if(!values.Username){
        errors.Username=toast.error("Username Required")
    }else if(values.Username.includes(" ")){
        errors.Username=toast.error("Invalid Username")
    }
    else{
        errors.Username=toast.success("Valid name")
    }

}
function passwordverification(errors:any={},values:any){
    const specialchar=/[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/;
    if(!values.Password){
        errors.Password=toast.error("Password Required")
    }else if(values.Username.includes(" ")){
        errors.Password=toast.error("WPassword cannot be empty")
    }
    else if(values.Password.length<4){
        errors.Password=toast.error("Password must contains more than 4 letters")
    }else if(!specialchar.test(values.Password)){
        errors.Password=toast.error("Password must contains a special character");
    }
    return errors;

}
export async function registervalidation(values:any){
    const errors =userverification({},values);
    passwordverification(errors,values);
    emailverify({},values);
}

function emailverify(error:any={} ,values:any){
    if(!values.email){
        error.email=toast.error("Enter email...");
    }
    else if(values.email.include(" ")){
        error.email=toast.error("Please enter a valid email");
    }
    return error;
}
export async function validateprofile(values:any){
    const errors=emailverify({},values);
    return errors
}