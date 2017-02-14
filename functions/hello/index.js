import {Observable} from 'rxjs';
import Middleware from 'middleware';

export default new Middleware()
  .get(() => Observable.of({'Content-Type': 'text/html', result: 'html'}))
  .post(() => Observable.of({'Content-Type': 'application/json', result: 'json'}))
  .default(() => ({'Content-Type': 'text/html', result: 'default response'}))
  .run();
