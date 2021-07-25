const express = require('express')
const app = express()
const path = require('path')


app.use(express.json())
// app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api',(req,res)=>{
    res.json({message:"Hello from server"})
})

app.get('/',(req,res)=>{
    // res.sendFile(__dirname, '../client/public/index.html')
    res.json({value:"kuch nhi mil rhi"})
})

app.get('*',(req,res)=>{
    res.send("Welcome to this page.")
})

app.post('/post',(req,res)=>{
    console.log("Connected to server")
    res.redirect('/')
})

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server is listening at port: ${PORT}`)
})