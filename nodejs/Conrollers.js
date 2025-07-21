import connection from "./config/db.js"
import Joi from "joi"
export const index=(req,res)=>{
    res.json({mess:'hello'})
}
export const insert=(req,res)=>{
    const schema=Joi.object({
        "f_name":Joi.string().required(),
        "l_name":Joi.string().required(),
        "email":Joi.string().email().required(),
        "phone":Joi.string().length(10)
    })
    const {value,error}=schema.validate(req.body);
    
    if (error) {
        res.json({error:error.details[0].message})
    }
    else{
         const {f_name,l_name,email,phone}=value;
        connection.query("INSERT INTO students(`fname`, `lname`, `email`, `phone`) values(?,?,?,?)",[f_name,l_name,email,phone],(err,result)=>{
            if (err) {
                res.send(err.sqlMessage)
            }
            else{
                res.json({success:"data saved"})
            }
            
        })
    }
   
}
export const getAllStudents=(req,res)=>{
   
    connection.query("SELECT * FROM students",(err,result)=>{
        if (err) {
            res.json({error:err.sqlMessage})
        }
        else if(result.length==0) {
            res.json({nodata:"no data available"})
        }
        else{res.json({result:result})}
    })
}
export const getStudentById=(req,res)=>{
   const id=req.params.id
    connection.query("SELECT * FROM students where sid=?",[id],(err,result)=>{
        if (err) {
            res.json({error:err.sqlMessage})
        }
        if (result.length==0) {
            res.send("no data available")
        }
        else{
           res.json({result:result}) 
        }
        
    })
}
export const updateStudent=(req,res)=>{
    const id=req.params.id
    const {f_name,l_name,email,phone}=req.body;
     connection.query("UPDATE students set fname=?, lname=?,email=?, phone=? where sid=?",[f_name,l_name,email,phone,id],(error,result)=>{
         if (error) {
            res.send(error.sqlMessage);
         }
         res.json({success:"student is updated"});
     })
 }

 export const DeleteStudent=(req,res)=>{
    const id=req.params.id
    connection.query("DELETE FROM students where sid=?",[id],(error,result)=>{
        if (error) {
            res.json({err:error.sqlMessage});
        }
        else{
            res.json({success:"Student deleted"})
        }
        
    })
 }