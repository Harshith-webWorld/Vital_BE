import joi from "joi";

const postValidation = joi.object({
    startYear: joi.number().integer().required().min(1950).max(new Date().getFullYear()),
    endYear: joi.number().integer().required().min(1950).max(new Date().getFullYear()),
    startMonth: joi.number().integer().required().min(1).max(12),
    endMonth: joi.number().integer().required().min(1).max(12)
});

export {
    postValidation
}