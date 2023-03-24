import joi from "joi";
import SqlString from 'sqlstring';
const customJOI = joi.extend({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.sanitize': '{{#label}} must be a valid string'
    },
    rules: {
        sanitize: {
            validate(value, helpers)
            {
                return SqlString.escape(value);
            }
        }
    }
});

const postValidation = joi.object({
    startYear: joi.number().integer().required().min(1950).max(new Date().getFullYear()),
    endYear: joi.number().integer().required().min(1950).max(new Date().getFullYear()),
    startMonth: joi.number().integer().required().min(1).max(12),
    endMonth: joi.number().integer().required().min(1).max(12)
    // test: customJOI.string().sanitize()
});

export {
    postValidation
}