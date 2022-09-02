/**
 * @desc Create a promise that rejects in <ms> milliseconds
 *
 * @param {Integer} ms - Timeout in milliseconds
 * @param {Promise} promise - Promise
 */
const promiseTimeout = function (ms, promise) {
    // Create a promise that rejects in <ms> milliseconds
    let timeout = new Promise((resolve, reject) => {
        let id = setTimeout(() => {
            clearTimeout(id);
            reject('Timed out in ' + ms + 'ms.')
        }, ms)
    })
    // Returns a race between our timeout and the passed in promise
    return Promise.race([
        promise,
        timeout
    ])
}

module.exports = {
    promiseTimeout,
}