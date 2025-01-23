import { body, param, ValidationChain } from 'express-validator';
import { STATUS_OPTIONS, PRIORITY } from '../constants';

// Task validation rules
const taskValidationRules = {
    name: body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),
    
    description: body('description')
        .optional()
        .trim(),
    
    status: body('status')
        .optional()
        .isIn(STATUS_OPTIONS)
        .withMessage('Invalid status'),
    
    priority: body('priority')
        .optional()
        .isInt({ min: PRIORITY.MIN, max: PRIORITY.MAX })
        .withMessage(`Priority must be between ${PRIORITY.MIN} and ${PRIORITY.MAX}`)
};

// ID validation rule
const idValidationRule = {
    id: param('id')
        .isInt({ gt: 0 })
        .withMessage('ID must be a positive integer')
};

// Export composed validation chains
export const validateResource: ValidationChain[] = Object.values(taskValidationRules);
export const validateId: ValidationChain[] = Object.values(idValidationRule);

// Export individual rules for more granular usage if needed
export const validationRules = {
    ...taskValidationRules,
    ...idValidationRule
};