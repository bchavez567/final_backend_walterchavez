const mongodb = require('mongodb');
const config = require('../../../config/config');
const dbConfig = require('../../../DB/config');

const PostDTO = require('../../dtos/post.dto');
const CustomError = require('../../../utils/errors/customsError');
const {STATUS} = require ('../../../utils/constants/api.constants');

const {
    MongoClient,
    ObjectId,
} = mongodb;


class PostMongoDAO{

    static #dbInstances = {};

    constructor(database){
        if (!PostMongoDAO.#dbInstances[database]){

            console.log(`[${config.NODE_ENV.trim()}] Connecting to ${database} database...`);
            MongoClient.connect(dbConfig.mongo.uri)
                .then((connetion) => {
                    PostMongoDAO.#dbInstances[database] = this;
                    const db = connetion.db(database);
                    this._collection = db.collection('posts');
                    console.log(`[${config.NODE_ENV.trim()}] Connecting to ${database}!`);
                })

        } else {
            return PostMongoDAO.#dbInstances[database];
        }
    }

    async getPosts() {
        try {
            return await this._collection.find({}).toArray() ;
        }
        catch(error){
            throw new CustomError (
                STATUS.SERVER_ERROR,
                'Error fetching post',
                error
            )
        }
    }
    async getPostById (id) {
        try {
            return await this._collection.findOne({_id: ObjectId(id)}) ;
        }
        catch(error){
            throw new CustomError (
                STATUS.SERVER_ERROR,
                `Error fetchin post with if ${id}`,
                error
            )
        }
    }
    async createPost (post) {
        try {
            const newPost = new PostDTO(post);
            await this._collection.insertOne(newPost);
            return newPost;
        }
        catch(error){
            throw new CustomError (
                STATUS.SERVER_ERROR,
                'Error creating post',
                error
            )
        }
    }
    // async updatePost () {}
    // async deletePost  () {}

}

module.exports = PostMongoDAO;