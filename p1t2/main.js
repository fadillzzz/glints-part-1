/**
 * Given an array, determine whether it can be sorted with one operation or less
 *
 * @param {Number[]} arr
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

    const reversables = reverse(arr);
    if (reversables.length > 0) {
        console.log('yes');
        console.log('reverse ' + reversables.map(x => x + 1).join(' '));
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

/**
 * Finds a possible sub array that can be reversed to sort the given array
 *
 * @param {Number[]} arr
 * @return {Number[]}
 */
function reverse(arr) {
    const copy = arr.slice();
    const reversables = [];
    for (let i = 0; i < arr.length -1; i++) {
        if (arr[i] > arr[i + 1]) {
            reversables.push(i);
        }
    }

    if (reversables.length > 0) {
        // The last element that was marked as part of the reversable sub array
        // is most likely a part of it.
        reversables.push(reversables[reversables.length - 1] + 1);

        if (isSequential(reversables)) {
            const start = Math.min(...reversables);
            const end = Math.max(...reversables);

            copy.splice(start, reversables.length, ...copy.slice(start, end + 1).reverse());

            if (isInOrder(copy)) {
                return [start, end];
            }
        }
    }

    return [];
}

/**
 * Checks if the given array contains a series of sequential number by one increment
 *
 * @param {Number[]} arr
 * @return {Boolean}
 */
function isSequential(arr) {
    const initial = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (initial + i !== arr[i]) {
            return false;
        }
    }

    return true;
}
