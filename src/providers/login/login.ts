import { Observable } from 'rxjs/Observable';


export abstract class LoginProvider {

  abstract login(username: string, password: string): Observable<any>;

}
