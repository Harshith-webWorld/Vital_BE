import joi from "joi";


const postValidation = joi.object({
    year: joi.number().integer().required()
});

export {
    postValidation
}