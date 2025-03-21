const { body, validationResult } = require('express-validator');
const {genPassword} = require('../lib/passwordUtil');
const { createUser, updateUser, deleteUser, getAllUser } = require('../model/prismaQueries');



const alphaErr = 'must oly contain letters.';
const emailErr = 'mist contain @ and ends with .com.';
const passLength = 'must be greater than 6 characters and less tha 20 characters.';


const validateUser = [
    body('fullname').trim()
        .matches(/^[A-Za-z\s]+$/).withMessage(`Full name ${alphaErr}`),
    body('email').trim()
        .isEmail().withMessage(`Email ${emailErr}`),
    body('password').trim()
        .isLength({min: 6, max: 20}).withMessage(`Password ${passLength}`)
]









const postCreateUser = [validateUser, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorsArray = errors.array();

        return res.json({error: errorsArray});
    }

    try {
        const { fullname, username, email, password, isAdmin } = req.body;

        const saltHash = genPassword(password);

        const salt = saltHash.salt;
        const hash = saltHash.hash;
        let role ='';
        if (isAdmin == 'true') {
            role = 'ADMIN';
        } 

        const newUser = await createUser(fullname, username, email, salt, hash, role);

        return res.json({Sucess: newUser});
    } catch (err) {
        console.error('Database Error: ', err);
        return res.status(500).json({error: 'An error occurred while processing your request. Please try again.',
            data: req.body
        });
    }
}];



const postEditUser = async (req, res) => {
    try {
        const { username, email, isAdmin } = req.body;
        const { id } = req.params;

        let role ='';
        if (isAdmin == 'true') {
            role = 'ADMIN';
        } else if (isAdmin == 'false') {
            role = 'BASIC'
        };

        const updatedUser = await updateUser(id, username, email, role)

        return res.json({Success: updatedUser})
    } catch (err) {
        console.error('Database error: ', err)
        return res.status(500).json({error: 'An error occurred while processing your request. Please try again.',
            data: req.body
        });
    }
}

const postDeleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteUser(id);

        return res.json({Success: 'User deleted successfully'})

    } catch (err) {
        console.error('Database error:', err)
        return res.status(500).json({error: 'An error occurred while processing your request. Please try again.',
            data: req.body
        });
    }
}

const getUsers = async (req, res) => {
    try {
        const allUsers = await getAllUser();

        const { basicUsers, adminUsers } = allUsers;
        

        return res.json({Success: 'List of users', basicUsers, adminUsers})
    } catch (err) {
        console.error('Database error:', err)
        return res.status(500).json({error: 'An error occurred while processing your request. Please try again.',
            data: req.body
        });
    }
}


module.exports = { postCreateUser, postEditUser, postDeleteUser, getUsers };