import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount=()=>{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [axioserror,setAxiosError]=useState(false)
    const [userError,setUserError]=useState(false)
    const [success,setSuccess]=useState(false)
    const navigate=useNavigate()
    const [loadingLogin,setLoadingLogin]=useState(false)
    async function handleCreate(e) {
        e.preventDefault();
        try{
        const resp=await axios.post(`http://localhost:4000/create_account`,{username:username,password:password});
        if (resp.data.errorr) {
            setUserError(resp.data.errorr)
            setSuccess(false)
            setAxiosError(false)
        }
        else{
            setSuccess(resp.data.success)
            setUserError(false)
            setAxiosError(false)
            setLoadingLogin(true)
            setTimeout(()=>{
                navigate("/")
            },3000)
            console.log(resp.data)

        }
    }
    catch(er){
        setUserError(false)
            setSuccess(false)
            setAxiosError(er.message)
    }
}

    return (
        <>
        <center>
            <h3 className="mt-5">Fill required information to get new account</h3>
            <form action="" method="post" onSubmit={handleCreate} className="col-lg-5 mt-5">
               <center>
               <div className="input-group mt-3">
                    <span className="input-group-text"><i className="fa fa-user fa-2x"></i></span>
                    <input type="username" value={username} className="form-control border-primary border-3 rounded-0" name="" id="" placeholder="username" onChange={(e)=>{
                        setUsername(e.target.value);
                    }}/>
                </div>
                <div className="input-group mt-3">
                    <span className="input-group-text"><i className="fa fa-lock fa-2x"></i></span>
                    <input type="password" value={password} className="form-control border-primary border-3 rounded-0" name="" id="" placeholder="password" onChange={(e)=>{
                        setPassword(e.target.value);
                    }}/>
                </div>
                <div className="mt-3">
                    {loadingLogin?<button className="btn btn-primary rounded-0" disabled >Wait..</button>:<button className="btn btn-primary rounded-0">Continue</button>  } 
                </div>
               </center>
            </form>
            {(userError)&&<div className="alert alert-info bg-warning col-lg-4 mt-3 text-dark"><p className="mt-3">{userError}</p></div>}
            {(axioserror)&&<div className="alert alert-info bg-warning col-lg-4 mt-3 text-dark"><p className="mt-3">{axioserror}</p></div>}
            {(success)&&<p className="mt-3 text-success">{success}</p>}
        </center>
        </>
    )
}

export default CreateAccount
