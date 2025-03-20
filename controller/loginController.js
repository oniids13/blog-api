const jwt = require('jsonwebtoken');
const { getUserLogIn } = require('../model/prismaQueries');
require('dotenv').config()

const secretKey = process.env.JWT_SECRETKEY;



const postLogin = async (req, res) => {
    let {email, password} = req.body;

    const user = await getUserLogIn(email, password);

    console.log('User:', user);

    if (!user || !user.id) {
        console.error("Login failed: Missing user or user ID");
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const tokenPayload = {
        id: user.id,
        email: user.email,
        username: user.username
    };


    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1d" });

   
    return res.status(200).json({
        message: 'Auth Passed',
        token
    });
};




module.exports = { postLogin }