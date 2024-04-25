const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.port || 5000;


app.use(cors())
app.use(express.json())



app.get('/',(req,res)=>{
    res.send('Assignment Management server is running')
})


app.listen(port,()=>{
    console.log(`Assignment server is running on port: ${port} `)
})