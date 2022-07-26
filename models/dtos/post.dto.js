class PostDTO {
    constructor (postItem, _id){
        Object.assign(this , postItem);
        this.createdAt = postItem.createdAt || Data.now();
        this.updateAt = Date.now();
        
        if (_id) {
            this._id = _id;
        }

    }
};

module.exports = PostDTO;