const express=require('express')
const mongoose = require('mongoose');
const routes=require('./routes')
const port=process.env.PORT||3000

const app=express()
mongoose.connect('mongodb://127.0.0.1:27017/testdb');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api',routes)
app.listen(port, ()=>{console.log("Server started")})