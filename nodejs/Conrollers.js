import connection from "./config/db.js"
import Joi from "joi"
import bcrypt from "bcrypt"
import { json } from "express"
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

 export const DeleteStudent=async (req,res)=>{
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
 export const CreateUser= async (req,res)=>{
    const dataschema=Joi.object({
        "username":Joi.string().max(20).required(),
        "password":Joi.string()
        .min(8)
        .max(20)
        .pattern(
            new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9])(?=.*[!?:@."])')
        )
        .messages({
           "string.pattern.base":"your password is weak ( You must include atleast one lowercase, one uppercase, 1 digit and one symbol)",
           "string.min":"minimum length of string must be 8 characters long",
           "string.max":"maximum length of string must be 20 characters long"
        })
    })
    const {value,error}=dataschema.validate(req.body);
    if (error) {
        res.json({errorr:error.details[0].message})
    }
    else{
        const {username,password}=value;
        const hashedpassword= await bcrypt.hash(password,12);
        connection.query("SELECT * FROM users where username=?",[username],(selecterror,result)=>{
            if (selecterror) {
               res.json({fetcherror:selecterror.sqlMessage}) 
            }
            else{
                if (result.length==0) {
                    connection.query("INSERT INTO users(`username`, `password`) values(?,?)",[username,hashedpassword],(inserterror,insresult)=>{
                        if (inserterror) {
                            res.json({inserterror:inserterror.sqlMessage})
                        }
                        else{
                            res.json({success:"New user created now"})
                        }
                    })
                }
                else{
                    res.json({errorr:"user already exists"})
                }
            }
        })
    }
 }


 export const Login=(req,res)=>{
    const dataschema=Joi.object({
        "username":Joi.string().max(20).required()
        .messages({
            "string.required":"All fields are not allowed to be empty",
         }),
        "password":Joi.string()
        .messages({
           "string.required":"All fields are not allowed to be empty",
        }).required(),
    })
    const {value,error}=dataschema.validate(req.body)
    if (error) {
        res.json({error:error.details[0].message})
    }
    else{
        const {username,password}=value;
        connection.query("SELECT * from users where username=?",[username],async (errorfet,result)=>{
            if (errorfet) {
                res.json({sqlerror:"Error while retrieving"})
            }
            else{
                if (result.length<1) {
                    res.json({error:"User not found"})
                }
                else{
                    const compared= await bcrypt.compare(password,result[0].password);
                    if (compared) {
                        res.json({loginsuccess:"you are logged in"})
                    }
                    else{
                        res.json({error:"Credentials not match"})
                    }
                }
            }
        })
    }
      
 }




