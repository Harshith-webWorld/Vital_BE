import _ from 'lodash';
import httpStatus from "http-status";
import {bodySchema, querySchema} from './schemas';

module.exports = (context) => (req, res, next) => {

  const _supportedMethods = ['post', 'put', 'get', 'patch', 'delete'];

  // Joi validation options
  const _validationOptions = {
    abortEarly: false,  // abort after the last validation error
    // allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true  // remove unknown keys from the validated data
  };

  const schemas = {
    body : bodySchema,
    query: querySchema
  }
  const route = req.originalUrl.split("?")[0];
  const method = req.method.toLowerCase();
  const _schema = _.get(schemas[context], route);
  if (_schema) {
    if (_.includes(_supportedMethods, method) && _.has(schemas[context], route)) {
      const { value, error } = _schema.validate(req[context], _validationOptions)
      if (error) {
        const JoiError = {
          status: 'failed',
          error: {
            original: error._object,
            // fetch only message and type from each error
            details: _.map(error.details, ({ message, type }) => ({
              message: message.replace(/['"]/g, ''),
              type
            }))
          }
        }
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
          status: httpStatus.UNPROCESSABLE_ENTITY,
          message: JoiError
        });
      } else {
        req[context] = value;
      }
    }
  }
  next()
}