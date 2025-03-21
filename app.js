const express = require('express');
const jwtStrategy = require('./config/jwtStrategy');
const passport = require('passport');
//Router modules
const userRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const homeRouter = require('./routes/homeRouter');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize());
passport.use(jwtStrategy);


app.get('/', (req, res) => {
    res.json({message: 'Hello!'})
})

// Routes
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);

app.listen(3000, () => {
    console.log('http://localhost:3000');
})