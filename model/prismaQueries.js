const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validPassword } = require('../lib/passwordUtil');

const createUser = async (fullname, username, email, salt, hash, role) => {
    try {
        const user = await prisma.user.create({
            data: {
                fullname,
                username,
                email,
                salt,
                hash,
                role
            },
            select: {
                fullname: true,
                username: true,
                email: true,
                salt: true,
                hash: true,
                role: true
            }
        })
    
        return user;
    } catch (err) {
        console.error('Error creating new user: ', error)
        throw err;
    }
    
}


const createPost = async (title, content, authorId, published) => {
    try { 
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                published,
                author: {connect: {id: authorId}}
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: { select: {username: true}},
                authorId: true,
                published: true
            }
        })

        return newPost
    } catch (err) {
        console.error('Error creating new post: ', err)
        throw err;
    }
    
}


const getAllPost = async (isPublished) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: isPublished
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                published: true,
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
        throw err;
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
                hash: true,
                role: true
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
        throw err;
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
        console.error(err)
        throw err;
    }
}


const createComment = async (content, postId, authorId) => {
    try {
        const newComment = await prisma.comment.create({
            data: {
                content,
                author: { connect: {id: authorId}},
                post: {connect: {id: postId}}
            }, select : {
                id: true,
                content: true,
                createdAt: true,
                author: {select: {username: true}},
                post: {select: {title:true}}
            }
        });

        return newComment;
    } catch (err) {
        console.error("Error creating comment: ", err)
        throw err;
    }
}


module.exports = { createUser, createPost, getAllPost, getUserLogIn, getUser, createComment };