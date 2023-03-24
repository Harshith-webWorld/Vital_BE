import joi from "joi";

const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
const monthValidator = {}
months.forEach(month => monthValidator[month] = joi.number().integer().allow(null))

const createValidation = joi.object({
    year: joi.number().integer().required(),
    districtId: joi.number().integer().min(1).required(),
    createdBy: joi.number().integer().required(),
    lastModifiedBy: joi.number().integer().required(),
    isActive: joi.boolean().required(),
    ...monthValidator
});

const updateValidation = joi.object({
    id: joi.number().integer().min(1).required(),
    srNo: joi.string().alphanum().regex(/^SR/).required(),
    year: joi.number().integer().required(),
    districtId: joi.number().integer().min(1).required(),
    createdBy: joi.number().integer().required(),
    lastModifiedBy: joi.number().integer().required(),
    isActive: joi.boolean().required(),
    ...monthValidator
});

const bulkCreateValidation = joi.object({
    hydrocelectomyOperations: joi.array().items(createValidation).required()
})

const deleteValidation = joi.object({
    id: joi.number().integer().min(1).required()
})

const getOneValidation = joi.object({
    id: joi.number().integer().min(1).required()
})

export {
    createValidation,
    bulkCreateValidation,
    updateValidation,
    deleteValidation,
    getOneValidation
}