const { success } = require('../config/jwtStrategy');
const { getAllPost, createPost, createComment, editPost, getPost, deletePost, editComment, deleteComment } = require('../model/prismaQueries');



const getAllPosts = async (req, res) => {
    try {
        const publishedPosts = await getAllPost(true);
        const unpublishedPosts = await getAllPost(false);

        const allPosts = publishedPosts.concat(unpublishedPosts)
        if (allPosts.length > 0) {
            return res.status(201).json({ success: "All Posts", publishedPosts, unpublishedPosts });
        }

        return res.json({error: "No Posts Yet."})
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
    
}

const getSinglePost = async (req, res) => {
    try {
        const {postId} = req.params;

        const getSinglePost = await getPost(postId);

        return res.status(201).json({success: true, getSinglePost})
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
    
}

const postCreatePost = async (req, res) => {
    try {
   
        if (!req.user) {
            return res.status(401).json({error: 'Unauthorized: No user data found.'})
        }

        const userID = req.user.id;



        const { title, content} = req.body;
        const published = req.body.published === "true" ? true : req.body.published === "false" ? false : req.body.published;


        const newPost = await createPost(title, content, userID, published);

        return res.status(201).json({ success: true, newPost });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
    
}


const postEditPost = async ( req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({error: 'Unauthorized: No user data found.'})
        }

        const authorId = req.user.id;
        const {postId } = req.params;
        const { title, content } = req.body;

        const updatedPost = await editPost(postId, title, content, authorId);

        return res.status(201).json({success: true, updatedPost})


    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
}


const deleteSinglePost = async (req, res) => {
    try {
        const {postId} = req.params
        console.log(postId)

        await deletePost(postId);

        return res.status(201).json({sucess: true, deletedPost: `${postId}`})
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

const putEditComment = async (req, res) => {
    try {
        const {commentId} = req.params;
        const { content } = req.body;
        const userId = req.user.id;

        const updatedComment = await editComment(commentId, userId, content)

        return res.status(201).json({success: true, updatedComment})
    } catch (err) {
        console.error("Error creating comment: ", err);
        return res.status(500).json({ success: false, error: err.message });
    }
}


const deleteUserComment = async (req, res) => {
    try {
        const {commentId} = req.params;
        const userId = req.user.id;

        await deleteComment(commentId, userId)

        return res.status(201).json({success: true, deleted: 'Comment deleted.'})
    } catch (err) {
        console.error("Error creating comment: ", err);
        return res.status(500).json({ success: false, error: err.message });
    }
}

module.exports = { getAllPosts, postCreatePost, postCreateComment, postEditPost, getSinglePost, deleteSinglePost, putEditComment, deleteUserComment };