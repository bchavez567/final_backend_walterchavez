const PostServices = require('../services/post/post.services');
const { STATUS } = require('../utils/constants/api.constants');
const { apiFailedResponse, apiSuccessResponse} = require('../utils/api.utils');

class PostControllers {

    constructor () {
        this.service = new PostServices();
    }

    async getPostsController (req, res , next){
        try{
            const posts = await this.service.getPostsService();
            const response = apiSuccessResponse(posts, STATUS.OK);
            return res.status(STATUS.OK).json(response);
        }
        catch(error){
            next (error)
        }
    }
    async getPostByIdController (req, res, next){
        try{
            const { id } = req.params;
            const posts = await this.service.getPostsByIdService(id);
            const response = apiSuccessResponse(posts, STATUS.OK);
            return res.status(STATUS.OK).json(response);
        }
        catch(error){
            next (error)
        }
    }
    async createPostController (req, res, next){
        try{
            const post = req.body
            const newPosts = await this.service.createPostService(post);
            const response = apiSuccessResponse(newPosts, STATUS.OK);
            return res.status(STATUS.CREATED).json(response);
        }
        catch(error){
            next (error)
        }
    }
}


module.exports = PostControllers;