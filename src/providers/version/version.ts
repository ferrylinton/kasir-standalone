import { Observable } from 'rxjs/Observable';

export abstract class VersionProvider {

  abstract findLatest(): Observable<string>;

}
