const mongodb = require('mongodb')
const { v4: uuid} = require('uuid');

const PostDTO = require('../../dtos/post.dto');
const CustomError = require('../../../utils/errors/customsError');
const {STATUS} = require ('../../../utils/constants/api.constants')

class PostMemDAO{
    constructor(){
        this.posts = [];
    }

    async getPosts() {
        return this.posts;
    }
    async getPostById (id) {
        const fondPost = this.posts.find((post) => post._id === id);
        if (!fondPost){
            throw new CustomError(
                STATUS.NOT_FOUND,
                `Post with id ${id} does nox exists in our records`
            )
        }
        return fondPost;
    }


    async createPost (post) {
        try {
            const newPost = new PostDTO(post , uuid());
            this.posts.push(newPost);
            return newPost;
        }
        catch(error){
            throw new CustomError (
                STATUS.SERVER_ERROR,
                'Error creating post',
                error
            )
        }
    // }
    // async updatePost () {}
    // async deletePost  () {}

}

module.exports = PostMemDAO;
