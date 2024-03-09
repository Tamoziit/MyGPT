import { body, validationResult } from "express-validator"; //npm library that contains in-built middlewares to validate client-side requests
//Validation loop : Runs until all client request data is error free & validated
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) { //error in validation case
                break;
            }
        }
        const errors = validationResult(req); //gives final result of validation of requests
        if (errors.isEmpty()) { //No error in validation : we can move to next middleware
            return next();
        }
        return res.status(422).json({ error: errors.array() }); //Error case : 422-unprocessable entity
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Enter valid Email"),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password should contain atleast 6 characters"),
];
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is Required"),
    ...loginValidator, //Reutiliziing already present validators
];
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is Required"),
];
//# sourceMappingURL=validators.js.map