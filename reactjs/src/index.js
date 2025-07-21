import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import View from './pages/View';
import NotFound from './pages/NotFound';
import UpdateStudent from './pages/UpdateStudent';
import AddSt from './pages/AddStudent';
const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/addstudent",
        element:<AddSt/>
      },
      {
        path:"/students",
        element:<View/>
      },
      {
        path:"/edit/:id",
        element:<UpdateStudent/>
      },
      {
        path:"*",
        element:<NotFound/>
      },
     
    ]
  }
  

])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='container'>
      <RouterProvider router={router}/>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
