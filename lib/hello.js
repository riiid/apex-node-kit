import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

export default () => {
  return Observable
    .of('hello')
    .delay(1000)
    .do(msg => console.log(msg));
};
