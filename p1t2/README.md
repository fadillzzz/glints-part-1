Time taken: 3H

# Examples

    const swapOrReverse = require('./main');

    swapOrReverse([1,2,4,3,5,6]);
    // yes
    // swap 3 4
    swapOrReverse([-3,2,-1,0,1,-2,6,8]);
    // yes
    // swap 2 6
    swapOrReverse([4,3,2,1]);
    // yes
    // reverse 1 4
    swapOrReverse([1,5,4,3,2]);
    // yes
    // reverse 2 5
    swapOrReverse([1, 4, 5, -1, 2, 3, 7, 10]);
    // no
