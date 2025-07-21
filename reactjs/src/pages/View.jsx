import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const View=()=>{
const [error,setError]=useState(false)
const [nodata,setNodata]=useState(false)
const [result,setResult]=useState([]);
const [success,Setsuccess]=useState();
const navigate=useNavigate()
const [isloading,setIsloading]=useState(true)
async function getStudents() {
        try{
            const resp=await axios.get("https://studentrecording.onrender.com/students");
            setIsloading(false)
            if (resp.data.error) {
                setError(error)
            }
            else if (resp.data.nodata) {
                setNodata(nodata)
            }
            else{
                setResult(resp.data.result)
            } 
        }
        catch(error){
            setError(error)
        }
        

    }
    useEffect(()=>{
        getStudents()
    },[])

    return (
        <>
        <center>
            <h1>Recorded students</h1>
            {
            isloading&&
            <>
            <h4 className="mt-5">Loading data from server</h4>
            <img src="../loading-spinner.gif" alt="no spinner" />
            </>
            }
        </center>
            <div>
                <center>
                    {error&&<div className="alert alert-warning bg-warning text-white col-lg-3 mt-5">{error.message}</div>}
                </center>
            <div className="row">
                {result.map((res,index)=>(
                    <>    
                        <div className="col-lg-4 mt-5">
                            <div className="card">
                                <div className="card-header bg-secondary text-white">
                                <p key={index}>{res.lname}</p>
                                </div>
                                <div className="card-body">
                                <p key={index}>{res.email}</p>
                                </div>
                                <div className="card-footer">
                                <Link to={'/edit/'+res.sid} className="btn btn-info"><i className="fa fa-edit text-white"></i></Link>
                                <button type="" className="btn btn-danger float-end" onClick={async (e)=>{
                                    e.preventDefault();
                                       try{

                                        const resp= await axios.post(`https://studentrecording.onrender.com/delete/${res.sid}`);
                                    if (resp.data.success) {
                                        alert("student deleted now");
                                        getStudents();
                                        
                                    }
                                    }
                                    catch(error){
                                        setError(error)
                                    }
                                }}><i className="fa fa-trash text-white"></i></button>
                                </div>
                            </div>
                        </div>
                    
                    </>
                ))}
                </div>
            </div>
        
        </>
    )
}

export default View