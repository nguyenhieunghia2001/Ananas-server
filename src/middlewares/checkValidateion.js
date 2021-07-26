const { validationResult } = require("express-validator");

const checkValidate = (req, res, next) => {
    const errors = validationResult(req);
    // If some error occurs, then this
    // block of code will run
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }
 
    // If no error occurs, then this
    // block of code will run
    else {
        next();
    }
}

module.exports = checkValidate;