const jwt = require('jsonwebtoken');
const { getUserLogIn } = require('../model/prismaQueries');
require('dotenv').config()

const secretKey = process.env.JWT_SECRETKEY;



const postLogin = async (req, res) => {
    let {email, password} = req.body;

    console.log("Login request received with email:", email);

    const user = await getUserLogIn(email, password);

    console.log('User:', user);

    if (!user || !user.id) {
        return res.status(401).json({ error: "Login failed: Wrong user or user ID" });
    }

    const tokenPayload = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
    };


    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1d" });

   
    return res.status(200).json({
        message: 'Auth Passed',
        token,
        userId: user.id,
        name: user.fullname,
        username: user.username,
        role: user.role
    });
};




module.exports = { postLogin}