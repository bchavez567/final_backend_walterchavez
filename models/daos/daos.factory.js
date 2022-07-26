const PostMemDAO = require('./post/post.mem.dao');
const PostMongoDAO = require('./post/post.mongo.dao');

class DAOSFactory{
    static getDAOS(type){
        let postDAO;
        switch(type.toLowerCase()){
            case 'mem':
                postDAO = new PostMemDAO();
                break;
            case 'mongo':
                postDAO = new PostMongoDAO('coderposts');
                break;
            default:
                throw new Error('Invalid data source, please provide one of the following (MEM | FILE | MONGO)')
        }
        return {
            postDAO,

        }
    }
}

module.exports = DAOSFactory;
