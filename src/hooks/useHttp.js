import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config){
    const response = await fetch(url, config);
    const resData= await response.json();
    if(!response.ok){
        throw new Error (resData.message ||'Somethig Went Wrong , failed to send request')
    }

    return resData;

}
export default function useHttp(url,config, initialData){
   const[error,setError] =useState();
   const[data,setData]=useState(initialData);
   const[isLoading, setIsLoading]=useState(false);

 const sendRequest=  useCallback( async function sendRequest(){
    setIsLoading(true);
    try{
        const resData= await  sendHttpRequest(url,config);
        setData(resData);

    }
    catch(error){
setError(error.message || 'something went wrong')
    }
    setIsLoading(false);      
    },[url, config])
    useEffect(()=>{
        if(config && 
            (config.method === 'GET' || !config.method)|| !config )
        sendRequest();
    },[sendRequest,config]);
  

    return{
        data,
        isLoading,
        error,
        sendRequest
    };

}