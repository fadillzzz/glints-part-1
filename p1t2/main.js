/**
 * Given an array, determine whether it can be sorted with one operation or less
 *
 * @param {Number[]}
 */
function swapOrReverse(arr) {
    // Solve base cases that we don't need to worry about at all
    if (isInOrder(arr)) {
        console.log('yes');
        return;
    }

    if (arr.length === 2) {
        console.log('yes');
        console.log('swap 1 2');
        return;
    }

    // Checks for a potential solution for other cases
    const swappables = swap(arr);
    if (swappables.length > 0) {
        console.log('yes');
        // Adds 1 to each element because the index is supposed to start from 1
        console.log('swap ' + swappables.map(x => x + 1).join(' '));
        return;
    }

    console.log('no');
}

/**
 * Checks if a given array is in ascending order
 *
 * @param {Number[]} arr
 * @return {Boolean}
 */
function isInOrder(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }

    return true;
}

/**
 * Looks for a one swap operation that could sort the given array
 *
 * @param {Number[]} arr
 * @return {Number[]}
 */
function swap(arr) {
    const copy = arr.slice();
    const swappables = [];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            swappables.push(i);
        }
    }

    // Only try to swap if there's only two suspected misplaced elements.
    // Don't bother otherwise as it's most likely unsolvable with one swap operation.
    if (swappables.length === 2) {
        // The element before the firstly suspected one is usually the real culprit
        swappables[0] -= 1;

        const temp = copy[swappables[0]];
        copy[swappables[0]] = copy[swappables[1]];
        copy[swappables[1]] = temp;

        if (isInOrder(copy)) {
            return swappables;
        }
    }

    return [];
}
