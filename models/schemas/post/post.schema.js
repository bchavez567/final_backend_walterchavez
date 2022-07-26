
const yup = require('yup');

class PostSchema {

    static #Schema = yup.object({

        title: yup.string().required(),
        body: yup.string().required(),
        author: yup.string().required(),
        image: yup.string().required(),
        email: yup.string().email().required(),
        viewed: yup.boolean().default(false).required(),

    });

    constructor( title, body, author, image, email, viewed) {
        this.title = title;
        this.body = body;
        this.author = author;
        this.image = image;
        this.email = email;
        this.viewed = viewed;
    }

    static async validate(postItem) {
        try {
            return await  PostSchema.#Schema.validate(postItem);
        }

        catch (error){
            throw error;
        }
    }
}

module.exports = PostSchema;