const express = require('express');
const connection = require("./config/connection");
const InvoiceRouter = require("./Route/Invoice.route")
const app = express()
const cors = require("cors");
// require("dotenv").config()
app.use(cors())
app.use(express.json())
app.use("/api", InvoiceRouter)

app.get("/", (req,res)=>{
    res.send("Hello World")
})

app.listen(8080, async (req,res)=>{
   try {
      await connection
      console.log("connected")
   } catch (error) {
      console.log(error);
   }
   console.log("connected to db");
})