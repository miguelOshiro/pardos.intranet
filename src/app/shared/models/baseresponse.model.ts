

export class BaseResponse<Type> {

    data!: Type;
    errors!: string[];
    exception!: string;
    isSuccess!: boolean;
    message!: string;
}