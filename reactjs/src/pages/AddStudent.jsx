import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const AddSt=()=>{
    const [fname,setFname ] = useState("")
    const [lname,setLname ] = useState("")
    const [email,setEmail ] = useState("")
    const [phone,setPhone] = useState("")
    const [err,setErr]=useState(false);
    const [success,setSuccess]=useState(false);
    const navigate=useNavigate()
    async function handleSubmit(e) {
        e.preventDefault();
        // const resp=await axios.post("http://localhost:4000/insert",{f_name:fname,l_name:lname,email:email,phone:phone})
        const resp=await axios.post("https://studentrecording.onrender.com/insert",{f_name:fname,l_name:lname,email:email,phone:phone})
        if (resp.data.error) {
            setErr(resp.data.error)
        }
        else{
            setSuccess(resp.data.success)
            setErr(resp.data.error)
            setEmail("");
            setFname("");
            setLname("");
            setPhone("");
            setTimeout(()=>{
                navigate("/students");
            })
        }

    }
    return(
        <>
        <h3>fill form</h3>
        <form className="col-lg-5" onSubmit={handleSubmit}>
            <div className="">
                <label htmlFor="">Enter first name</label>
                <input type="text" name="" value={fname} id="" className="form-control" onChange={(e)=>{
                    setFname(e.target.value)
                }} />
            </div>
            <div className="">
                <label htmlFor="">Enter second name</label>
                <input type="text" name="" value={lname} id="" className="form-control" onChange={(e)=>{
                    setLname(e.target.value)
                }} />
            </div>
            <div className="">
                <label htmlFor="">Enter email</label>
                <input type="email" name="" value={email} id="" className="form-control" onChange={(e)=>{
                    setEmail(e.target.value)
                }} />
            </div>
            <div className="">
                <label htmlFor="">Enter phone</label>
                <input type="tel" name="" maxLength="10" value={phone} id="" className="form-control" onChange={(e)=>{
                    setPhone(e.target.value)
                }} required/>
            </div>
            <div className="mt-3 float-end">
                <button  name="" value="" id="" className="btn btn-success">Add</button>
            </div>
        </form>
        {err&&<p className="text-danger">{err}</p>}
        {success&&  <p className="text-danger">{success}</p>}


        </>
    )
}
export default AddSt