class BadRequestError extends Error {
    constructor(message = "Bad Request") {
      super(message);
      this.name = "BadRequestError";
      this.statusCode = 400;
    }
  }
  
  module.exports = BadRequestError;