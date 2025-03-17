import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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


const createPost = async (title, content, author, authorId) => {
    try { 
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                author,
                authorId
            },
            select: {
                title: true,
                content: true,
                author: true,
                authorId: true
            }
        })
        return newPost
    } catch (err) {
        console.error('Error creating new post: ', err)
    }
    
}


const getAllPost = async () => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true,
                createdAt: true,
                comments: {
                    include: {
                        author: true,
                        createdAt: true
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


module.exports = { createUser, createPost, getAllPost };