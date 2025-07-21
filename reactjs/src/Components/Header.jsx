import { Link } from "react-router-dom"

const Header=({title})=>{
    return (
        <>
        <div className="row bg-dark text-white p-3">
            <div className="col-lg-3">
                {title}
            </div>
            <div className="col-lg-4">
            <div className="nav">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link text-white-50">Home</Link>
                            
                        </li>
                        <li className="nav-item">
                            <Link to={"/addstudent"} className="nav-link text-white-50">add student</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/students"} className="nav-link text-white-50">view students</Link>
                            
                        </li>
                    </ul>

                </div>
            </div>
        </div>
        
        </>
    )
}
export default Header