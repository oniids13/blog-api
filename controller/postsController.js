const { getAllPost, createPost, createComment } = require('../model/prismaQueries');



const getAllPosts = async (req, res) => {
    try {
        const publishedPosts = await getAllPost(true);
        const unpublishedPosts = await getAllPost(false);

        const allPosts = publishedPosts.concat(unpublishedPosts)
        if (allPosts.length > 0) {
            return res.status(201).json({ success: true, publishedPosts, unpublishedPosts });
        }

        return res.json({error: "No Posts Yet."})
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
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
        const published = req.body.published === "true" ? true : req.body.published === "false" ? false : req.body.published;


        const newPost = await createPost(title, content, userID, published);

        return res.status(201).json({ success: true, newPost });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
    
}

const postCreateComment = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({error: "Unauthorized: No user data found."})
        }

        const { content } = req.body;
        const { postId } = req.params;
        const userId = req.user.id;

        const newComment = await createComment(content, postId, userId);

        return res.status(201).json({success: true, comment: newComment});
    } catch (err) {
        console.error("Error creating comment: ", err);
        return res.status(500).json({ success: false, error: err.message });
    }
}


module.exports = { getAllPosts, postCreatePost, postCreateComment };