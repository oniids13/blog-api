const { getAllPost, createPost } = require('../model/prismaQueries');



const getHome = async (req, res) => {
    try {
        const allPosts = await getAllPost();

        if (allPosts.length > 1) {
            return res.json({posts: allPosts})
        }

        return res.json({error: "No Posts Yet."})
    } catch (err) {
        console.error(err);
        return res.json({err});
    }
    
}


const postCreatePost = async (req, res) => {
    try {
        console.log("User Data:", req.user);

        if (!req.user) {
            return res.status(401).json({error: 'Unauthorized: No user data found.'})
        }

        const userID = req.user.id;
        const userName = req.user.username;

        console.log(userID, userName)

        const { title, content} = req.body;

        const newPost = await createPost(title, content, userID);

        return res.status(201).json({ success: true, newPost });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
    
}

module.exports = { getHome, postCreatePost };