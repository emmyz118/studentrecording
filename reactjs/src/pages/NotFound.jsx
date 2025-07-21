import { Link } from "react-router-dom"

const NotFound=()=>{
    return(
        <>
        <div className="alert alert-info mt-5">
        <center>
        <h3>Page is not found</h3>
        <p>
        <i className="fa fa-warning fa-2x mt-3 text-warning"></i>
        </p>

        <Link to="/"  className="btn btn-outline-primary mt-3 btn-lg">Go back to home</Link>
        </center>
        </div>
        </>
    )
}
export default NotFound