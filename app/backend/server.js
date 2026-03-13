import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"
import cors from "cors"
const app = express();
dotenv.config();

// ================================     observability       =========================
import client from "prom-client";
client.collectDefaultMetrics()
const requestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP Requests",
  labelNames: ['method', 'path', 'status_code']
})

app.use((req, res, next) => {
  requestCounter.inc()
  next()
})

app.get("/metrics", async (req,res)=>{
  res.set("Content-Type", client.register.contentType)
  res.end(await client.register.metrics())
})
// ================================     observability       =========================

app.get("/", (req,res)=>{
  res.send("Hello DevOps")
})

app.use(
  cors({
    origin: "http://localhost:5173"
  })
)
app.use(express.json())
app.use("/api/products",productRoutes)




app.listen(process.env.PORT , ()=> {
    connectDB()
    console.log("server is live at http://localhost:" + process.env.PORT);
    
})



//server.js


