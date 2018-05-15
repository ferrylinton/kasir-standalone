import { Base } from './base.model';

export interface Audit extends Base {

    createdBy?: string;

    createdDate?: Date;

    lastModifiedBy?: string;

    lastModifiedDate?: Date;

}