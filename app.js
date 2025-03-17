const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.get('/', (req, res) => {
    res.json({message: 'Hello!'})
})




app.listen(3000, () => {
    console.log('http://localhost:3000');
})