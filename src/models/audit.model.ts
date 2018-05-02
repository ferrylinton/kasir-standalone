import { Base } from './base.model';
import { User } from './user.model';

export interface Audit extends Base {

    createdBy?: User;

    createdDate?: Date;

    lastModifiedBy?: User;

    lastModifiedDate?: Date;

}