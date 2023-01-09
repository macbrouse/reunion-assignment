const express=require('express')
const mongoose = require('mongoose');
const routes=require('./routes')

const app=express()
mongoose.connect('mongodb://127.0.0.1:27017/testdb');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api',routes)
app.listen(3000, ()=>{console.log("Server started")})