class CustomError {
    constructor(statusCode, description, errorDetails){
        this.status = statusCode;
        this.message = description;
        this.deatails = errorDetails;
    }
};

module.exports = CustomError;