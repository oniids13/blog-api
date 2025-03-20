const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validPassword } = require('../lib/passwordUtil');

const createUser = async (fullname, username, email, salt, hash) => {
    try {
        const user = await prisma.user.create({
            data: {
                fullname,
                username,
                email,
                salt,
                hash,
            },
            select: {
                fullname: true,
                username: true,
                email: true,
                salt: true,
                hash: true
            }
        })
    
        return user;
    } catch (err) {
        console.error('Error creating new user: ', error)
    }
    
}


const createPost = async (title, content, authorId) => {
    try { 
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                author: {connect: {id: authorId}}
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: { select: {username: true}},
                authorId: true
            }
        })
        console.log(newPost)
        return newPost
    } catch (err) {
        console.error('Error creating new post: ', err)
        throw err;
    }
    
}


const getAllPost = async () => {
    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                    }
                },
                comments: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
                        author: {
                            select: {
                                id: true,
                                username: true,             
                            }
                        }
                    }
                }
            }
        });
        return posts;
    } catch (err) {
        console.error('Error fetching posts: ', err)
    } finally {
        await prisma.$disconnect();
    }
}


const getUserLogIn = async (email, password) => {

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                id: true,
                fullname: true,
                username: true,
                email: true,
                salt: true,
                hash: true
            }
        })
        if (!user) {
            return {message: 'Email address not found!'}
        }
        const isValid = validPassword(password, user.hash, user.salt);

        if (isValid) {
            return user;
        } else {
            return {message: 'Incorrect Password'}
        }
    } catch (err) {
        console.error(err)
        return {error: err}
    }
}

const getUser = async (id) => {
    if (!id) {
        console.error('undefined ID');
        return null;
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        return user
    } catch (err) {
        console.error
        return {error: err}
    }
}

module.exports = { createUser, createPost, getAllPost, getUserLogIn, getUser };