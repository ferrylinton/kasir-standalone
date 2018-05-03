import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';

export abstract class UserProvider {

  abstract findById(id: string): Observable<User>;

  abstract findByUsername(username: string): Observable<User>;

  abstract findAll(): Observable<User[]>;

  abstract save(role: User): void;

  abstract update(role: User): void;

  abstract delete(id: string): void;

}
