import client from "prom-client"

client.collectDefaultMetrics()
const requestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP Requests"
})
app.get("/", (req,res)=>{
  requestCounter.inc()
  res.send("Hello DevOps")
})
app.get("/metrics", async (req,res)=>{
  res.set("Content-Type", client.register.contentType)
  res.end(await client.register.metrics())
})