const BigNumber = require('bignumber.js');

function fact(x) {
    if (x == 1) {
        return 1;
    }

    return (new BigNumber(x)).multipliedBy(fact(x - 1)).toFixed();
}
