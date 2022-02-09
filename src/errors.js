/** 
 * Class representing a custom error 
 * @extends Error
*/
class CustomError extends Error {
    /**
     * Create a CustomError
     * @param {number} statusCode - The status code for the error
     * @param {string} message - The message for the error
     */
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
      }    
}

/**
 * Custom error handler for wrapping error with message 
 * @param {CustomError} err - The CustomError to be handled
 * @param {express.Response} res - The Express Response
 */
const handleError = (err, res) => {
    console.log(err);
    res.status(err.statusCode).json({ error: err.message });
}

module.exports = {
    CustomError,
    handleError
}