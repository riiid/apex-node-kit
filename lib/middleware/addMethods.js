import {Observable} from 'rxjs';
import {OuterSubscriber} from 'rxjs/OuterSubscriber';
import {subscribeToResult} from 'rxjs/util/subscribeToResult';

Observable.prototype.get = function(project, resultSelector) {
  return this.lift(new MethodOperator(project, resultSelector, 'GET'));
};

Observable.prototype.post = function(project, resultSelector) {
  return this.lift(new MethodOperator(project, resultSelector, 'POST'));
};

Observable.prototype.patch = function(project, resultSelector) {
  return this.lift(new MethodOperator(project, resultSelector, 'PATCH'));
};

Observable.prototype.delete = function(project, resultSelector) {
  return this.lift(new MethodOperator(project, resultSelector, 'DELETE'));
};

class MethodOperator {
  constructor(project, resultSelector, method) {
    this.project = project;
    this.resultSelector = resultSelector;
    this.method = method;
  }

  call(observer, source) {
    const subscriber = new MethodSubscriber(
      observer, this.project, this.resultSelector, this.method
    );
    return source.subscribe(subscriber);
  }
}

class MethodSubscriber extends OuterSubscriber {
  constructor(destination, project, resultSelector, method) {
    super(destination);
    this.project = project;
    this.resultSelector = resultSelector;
    this.method = method;
    this.index = 0;
  }

  _next(value) {
    let result;
    const index = this.index++;
    try {
      if (this.method === value.method) {
        result = this.project(value, index);
      } else {
        this.destination.next(value);
        return;
      }
    } catch (err) {
      this.destination.error(err);
      return;
    }
    this._innerSub(result, value, index);
  }

  _innerSub(ish, value) {
    this.add(subscribeToResult(this, ish, value, 0));
  }

  _complete() {
    this.hasCompleted = true;
    this.destination.complete();
  }

  notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
    if (this.resultSelector) {
      this._notifyResultSelector(
        outerValue, innerValue, outerIndex, innerIndex
      );
    } else {
      this.destination.next({
        ...outerValue,
        response: innerValue
      });
    }
  }

  _notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex) {
    let result;
    try {
      result = this.resultSelector(
        outervalue, innerValue, outerIndex, innerIndex
      );
    } catch (err) {
      this.destination.error(err);
      return;
    }
    this.destination.next(result);
  }

  notifyComplete(innerSub) {
    this.remove(innerSub);
    this.destination.complete();
  }
}
