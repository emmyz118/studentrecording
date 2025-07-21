import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
// import {BrowserRouter, Routes, Route} from "react-router-dom"
// import Home from './pages/Home';
// import Addstudent from './pages/AddStudent';
// import View from './pages/View';
const App=()=> {
  return (
    <>
    <div className="container mt-3">
      <Header title="Student Record"/>
      <div className='mt-3'>
      <Outlet/>
      {/* <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/add' element={<Addstudent/>}/>
      <Route path='/students' element={<View/>}/>
    </Routes>
    </BrowserRouter> */}
      </div>
    </div>
   
    </>
  
  );
}

export default App;
