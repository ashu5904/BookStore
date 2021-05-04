require('dotenv').config({
    path: './config/config.env'
})

const connectDB = require('./config/db');
connectDB();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(3001, (req, res) => {
    console.log("Server Listening at port 3001");
})