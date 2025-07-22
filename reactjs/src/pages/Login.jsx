import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login =()=>{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [axioserror,setAxiosError]=useState(false)
    const [userError,setUserError]=useState(false)
    const [success,setSuccess]=useState(false)
    const navigate=useNavigate()
    const [loadingLogin,setLoadingLogin]=useState(false)
   
        async function handleLogin(e) {
            e.preventDefault();
            try{
            // const resp=await axios.post(`http://localhost:4000/login`,{username:username,password:password});
            const resp=await axios.post(`https://studentrecording.onrender.com/login`,{username:username,password:password})
            if (resp.data.error) {
                setUserError(resp.data.error)
                setSuccess(false)
                setAxiosError(false)
            }
            else{
                setSuccess(resp.data.loginsuccess)
                setUserError(false)
                setAxiosError(false)
                setLoadingLogin(true)
                setTimeout(()=>{
                    navigate("/home")
                },4000)

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
            <h3 className="mt-5">Fill your credentials to get logged in</h3>
            <form action="" method="post" onSubmit={handleLogin} className="col-lg-5 mt-5">
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
                    {loadingLogin?<button className="btn btn-primary rounded-0" disabled >Wait..</button>:<button className="btn btn-primary rounded-0">Login</button>  } 
                    {!loadingLogin&&
                    <>
                    <span className="px-5">Or</span>
                    <Link to="/create_account">Create new account</Link>
                    </>} 
                </div>
               </center>
            </form>
            {(userError)&&<div className="alert alert-info bg-warning col-lg-4 mt-3 text-dark"><p className="mt-3">{userError}</p></div>}
            {(axioserror)&&<div className="alert alert-info bg-warning col-lg-4 mt-3 text-dark"><p className="mt-3">{axioserror}</p></div>}
            {(success)&&<div className="alert alert-info bg-warning col-lg-4 mt-3 text-dark"><p className="mt-3">{success}</p></div>}
        </center>
        </>
    )
}

export default Login;