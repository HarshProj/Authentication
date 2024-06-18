//convert image to base 64
export const converttobase64=(file:any)=>{
    return new Promise((resolve,reject)=>{
        const filereade=new FileReader();
        filereade.readAsDataURL(file);

        filereade.onload=()=>{
            resolve(filereade.result);
        }
        filereade.onerror=(error:any)=>{
            reject(error);
        }
    })
}
