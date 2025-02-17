class ExpressError extends Error{
    constructor(status,message){
        super();
        this.status = status;
        this.message = message;
    }
}
module.exports = ExpressError;


/* It looks like the code snippet you provided is a JavaScript class definition for an `ExpressError`
class. This class extends the built-in `Error` class and has a constructor that takes `status` and
`message` parameters. */
