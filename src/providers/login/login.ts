import { Observable } from 'rxjs/Observable';
import { Login } from '../../models/login.model';

export abstract class LoginProvider {

  abstract doLogin(login: Login): Observable<any>;

}
