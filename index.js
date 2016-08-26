/**
 * Just a promise from the side of executor and not caller
 */
class Future {

  constructor() {
    this._promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }

  get promise() {
    return this._promise
  }

}

/**
 * Calls callee by passing it a callback with err and result arguments and returns
 * a promise resolved with the result or rejected with err. For simplicity doesn't take
 * other agrguments than callee cause they could be passed using .bind e.g.:
 *   Future.call(myMethod.bind(this, arg1, arg2));
 */
Future.call = (callee) => {
  let future = new Future
  let callback = (err, result) => {
    if (err) {
      future.reject(err)
    }
    else {
      future.resolve(result)
    }
  }
  callee.call(null, callback)
  return future.promise
}

module.exports = Future
