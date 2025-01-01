import commonError from '../../constants/commonErrors.js';
const { DATA_NOT_FOUND_FOR_VALIDATION, INVALID_JOI_SCHEMA } = commonError
export class JoiValidator {
    constructor() { }
    joiValidation(value, joiSchema, language) {
        if (!value) {
            return Error('DATA_NOT_FOUND_FOR_VALIDATION');
        }
        if (!joiSchema) {
            return Error('INVALID_JOI_SCHEMA');
        }
        const { error, validationResult } = joiSchema.validate(value, { abortEarly: false, errors: { language } });

        if (error) {
            return error || validationResult;
        }
    };
}
const joiValidator = new JoiValidator();
export default joiValidator;