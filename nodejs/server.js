import exp from "express"
import router from "./routes.js";
import cors from "cors"
const app= exp();
app.use(cors())
app.use(exp.json())
app.listen(4000);
app.use(router)

