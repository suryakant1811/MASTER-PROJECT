import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"
import cors from "cors"
const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173"
  })
)
app.use(express.json())
app.use("/api/products",productRoutes)


app.get("/", (req, res) => {
    return res.send("this is live")
})

app.listen(process.env.PORT , ()=> {
    connectDB()
    console.log("server is live at http://localhost:" + process.env.PORT);
    
})



//server.js


