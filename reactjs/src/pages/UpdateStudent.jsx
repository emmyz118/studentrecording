import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
const UpdateStudent=()=>{

    const par=useParams();
    const id=par.id;
    const [student,setStudent]=useState(null);
    const [error,setError]=useState(false);
    const [success,setSuccess]=useState(false);
    const [isloading,setIsloading]=useState(false);
    const navigate=useNavigate()
    async function getStudent() {
       try{
        const res=await axios.get(`https://studentrecording.onrender.com/students/${id}`);
        if (res.data.error) {
            setError(error)
        }
        setStudent(res.data.result[0])
       }
       catch(error){
            setError(error)
       }
    }
    useEffect(()=>{
        getStudent();
    },[id])


    async function SubmitStudent(e) {
        e.preventDefault();
        setIsloading(true);
        const res=await axios.post(`https://studentrecording.onrender.com/update/${id}`,{f_name:student.fname,l_name:student.lname,email:student.email,phone:student.phone});
        if (res.data.success) {
            setSuccess(res.data.success)
            setIsloading(false);
            setTimeout(()=>{
                navigate("/students");
            },3000)
        }

        
    }
    return(
        <>
        <h3>update record</h3>
        {error&&<p className="text-danger">{error.message="No connection to server"}</p>}
        <center>
        <form action="" method="post" onSubmit={SubmitStudent} className="col-lg-4">
            <div className="mt-3">
                <label className="float-start" htmlFor="">first name</label>
                <input type="text" value={student?.fname} className="form-control" onChange={(e)=>{
                    setStudent({...student,fname:e.target.value})
                }}/>
            </div>
            <div className="mt-3">
                <label className="float-start" htmlFor="">second name</label>
                <input type="text" value={student?.lname} className="form-control" onChange={(e)=>{
                    setStudent({...student,lname:e.target.value})
                }}/>
            </div>
            <div className="mt-3">
                <label className="float-start" htmlFor="">email</label>
                <input type="text" value={student?.email} className="form-control" onChange={(e)=>{
                    setStudent({...student,email:e.target.value})
                }}/>
            </div>
            <div className="mt-3">
                <label className="float-start" htmlFor="">telephone</label>
                <input type="tel" value={student?.phone} className="form-control" onChange={(e)=>{
                    setStudent({...student,phone:e.target.value})
                }}/>
            </div>
            <div>
                <button className="btn btn-success mt-3 float-end">{isloading?"Updating....":"Update"}</button>
            </div>

                
            
        </form>
        {success&&<p className="text-success mt-5">{success}</p>}
        </center>

        </>
    )
}
export default UpdateStudent