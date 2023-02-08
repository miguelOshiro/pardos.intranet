import { ManagementQueryModel } from './management-query.model';
export class ManagementStatusQueryModel {

    id: string;
    name: string;
    description: string;
    color: string;
    managements: ManagementQueryModel[];

}