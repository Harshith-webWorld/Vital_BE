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
    yearType: customJOI.string().sanitize().valid('calender', 'financial').required()
});

export {
    postValidation
}