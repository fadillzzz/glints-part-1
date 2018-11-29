const BigNumber = require('bignumber.js');

/**
 * Given an integer, calculate the factorial value and return it
 *
 * @param {Number} x
 * @return {String}
 */
module.exports = function fact(x) {
    if (x == 1) {
        return 1;
    }

    return (new BigNumber(x)).multipliedBy(fact(x - 1)).toFixed();
}
