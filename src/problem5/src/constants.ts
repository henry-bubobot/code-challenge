export const STATUS_OPTIONS = ['ACTIVE', 'INACTIVE'] as const;

export const PRIORITY = {
    MIN: 1,
    MAX: 5
} as const;

export const PRISMA_ERROR_CODES = {
    UNIQUE_CONSTRAINT: 'P2002',
    FOREIGN_KEY_CONSTRAINT: 'P2003',
    RECORD_NOT_FOUND: 'P2025'
} as const;

export const ERROR_MESSAGES = {
    DUPLICATE_RECORD: 'Duplicate record',
    FOREIGN_KEY_FAILED: 'Foreign key constraint failed',
    RECORD_NOT_FOUND: 'Record not found',
    INTERNAL_SERVER_ERROR: 'Internal Server Error'
} as const;