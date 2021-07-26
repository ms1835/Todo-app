const express = require('express')
const app = express()



app.use(express.json())

app.get('/api',(req,res)=>{
    res.json({message:"Hello from server"})
})



app.post('/post',(req,res)=>{
    console.log("Connected to server")
    res.redirect('/')
})

app.get('*',(req,res)=>{
    res.send("Undefined reference.")
})

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server is listening at port: ${PORT}`)
})