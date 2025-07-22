import { Router } from "express";
import { CreateUser, DeleteStudent, getAllStudents, getStudentById, index, insert, Login, updateStudent } from "./Conrollers.js";

const router=Router()
router.get("/",index)
router.post("/insert",insert)
router.get("/students",getAllStudents)
router.get("/students/:id",getStudentById)
router.post("/update/:id",updateStudent)
router.post("/delete/:id",DeleteStudent)
router.post("/create_account",CreateUser)
router.post("/login",Login)
export default router