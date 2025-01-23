import { Status } from '@prisma/client';

export interface ResourceInput {
    name: string;
    description?: string;
    status: Status;
    priority?: number;
}

export interface PaginationQuery {
    page?: string;
    limit?: string;
    name?: string;
}
