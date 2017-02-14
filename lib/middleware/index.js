import {Subject} from 'rxjs';
import 'middleware/addMethods';

export default class Middleware {

  constructor() {
    this.$ = new Subject();
  }

  get(...args) {
    this.$ = this.$.get(...args);
    return this;
  }

  post(...args) {
    this.$ = this.$.post(...args);
    return this;
  }

  patch(...args) {
    this.$ = this.$.patch(...args);
    return this;
  }

  delete(...args) {
    this.$ = this.$.delete(...args);
    return this;
  }

  use(project) {
    this.$ = this.$.map(d => {
      return {
        ...d,
        response: project.call(this, d.response, this.event)
      };
    });
    return this;
  }

  default(project) {
    this.$ = this.$.map(d => {
      if (d.response) {
        return d;
      }
      return {
        ...d,
        response: project.call(this, d.response, this.event)
      };
    });
    return this;
  }

  _updateContext() {
    this.context.callbackWaitsForEmptyEventLoop = false;
  }

  _subscribe() {
    this.$
      .map(({response}) => response)
      .do(response => {
        if (!response) {
          throw new Error('response cannot be null or undefined.');
        }
        if (!response['Content-Type']) {
          throw new Error('response should contain "Content-Type".');
        }
        if (!response.result) {
          throw new Error('response should contain "result".');
        }
      })
      .do(this._updateContext.bind(this), this._updateContext.bind(this))
      .subscribe(response => {
        this.cb(null, response);
      }, err => {
        this.cb(err);
      }, () => {
      });
  }

  run() {
    return (event, context, cb) => {
      this.event = event;
      this.context = context;
      this.cb = cb;
      this._subscribe();
      this.$.next(event);
    };
  }
}
