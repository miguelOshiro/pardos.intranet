export class PaginateResponseModel<Type> {
    items!: Type;
    pageIndex: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}