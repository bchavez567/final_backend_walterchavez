const config = require('../../config/config');
const DAOSFactory = require('../../models/daos/daos.factory');
const PostSchema = require('../../models/schemas/post/post.schema');
const { STATUS } = require('../../utils/constants/api.constants');
const CustomError = require('../../utils/errors/customsError');

class PostServices {
    static async #validatePost (post) {
        try{
            return await PostSchema.validate(post);
        }
        catch(error){
            throw new CustomError(
                STATUS.BAD_REQUEST,
                `Validation error `,
                error,
            )
        }
    }

    constructor () {
        this.postDAO = DAOSFactory.getDAOS(config.DATA_SOURCE).postDAO;
    }

    async getPostsService (){
        return await this.postDAO.getPosts();
    }

    async getPostsByIdService(id){
        if (!id){
            throw new CustomError(
                STATUS.BAD_REQUEST,
                'The id param is a required field'
            )
        }
        return await this.postDAO.getPostById(id);
    }

    async createPostService (post) {
        const post = PostServices.#validatePost(post);
        return await this.postDAO.createPost(post);
    }
}

module.exports = PostServices;