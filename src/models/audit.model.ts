import { Base } from './base.model';
import { User } from './user.model';

export interface Audit extends Base {

    createdBy?: string | User;

    createdDate?: Date;

    lastModifiedBy?: string | User;

    lastModifiedDate?: Date;

}