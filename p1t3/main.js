/**
 * Rotate a given matrix r times
 *
 * @param {Number[]} arr
 * @param {Number} r The number of rotations that we want to perform
 */
function rotate(arr, r) {
    const size = [arr.length, arr[0].length];
    const rotated = arr.map(x => x.slice());

    // Work our way from the outermost rectangle into the innermost one
    // for (let i = 0; i < Math.min(...size) / 2; i++) {
        const coords = generateCoords(size);
        coords.forEach(coord => {
            const newCoord = rotateCoordinate(size, coord, getRelevantRotations(size, r));
            rotated[newCoord[0]][newCoord[1]] = arr[coord[0]][coord[1]];
        });
    // }

    return rotated;
}

/**
 * Find the target coordinate by walking through the matrix
 * in a rectangular pattern
 *
 */
function rotateCoordinate(size, coordinate, rotations) {
    const boundaries = size.map(m => m - 1);
    let newCoordinate = coordinate.slice();

    // Move down
    if (rotations > 0 && newCoordinate[1] < boundaries[1] && newCoordinate[0] >= newCoordinate[1]) {
        newCoordinate[0] += rotations;
        rotations = 0;

        if (newCoordinate[0] > boundaries[0]) {
            rotations = newCoordinate[0] - boundaries[0];
            newCoordinate[0] = boundaries[0];
        }
    }

    // Move right
    if (rotations > 0 && newCoordinate[0] === boundaries[0]) {
        newCoordinate[1] += rotations;
        rotations = 0;

        if (newCoordinate[1] > boundaries[1]) {
            rotations = newCoordinate[1] - boundaries[1];
            newCoordinate[1] = boundaries[1];
        }
    }

    // Move up
    if (rotations > 0 && newCoordinate[1] === boundaries[1]) {
        newCoordinate[0] -= rotations;
        rotations = 0;

        if (newCoordinate[0] < 0) {
            rotations = 0 - newCoordinate[0];
            newCoordinate[0] = 0;
        }
    }

    // Move left
    if (rotations > 0) {
        newCoordinate[1] -= rotations;
        rotations = 0;

        if (newCoordinate[1] < 0) {
            rotations = 0 - newCoordinate[1];
            newCoordinate[1] = 0;
        }
    }

    return newCoordinate;
}

function getRelevantRotations(size, rotations) {
    return rotations % size.reduce((acc, x) => (x - 1) * 2 + acc, 0);
}

function generateCoords(size) {
    const coords = [];
    let coord = [0, 0];

    size.forEach((x, y) => {
        for (let i = 1; i < x; i++) {
            coord[y] += 1;
            coords.push(coord.slice());
        }
    });

    size.forEach((x, y) => {
        for (let i = x - 1; i > 0; i--) {
            coord[y] -= 1;
            coords.push(coord.slice());
        }
    });

    return coords;
}


// 4 4 1


// [[1, 2, 3, 4],

// [5, 6, 7, 8],

// [9, 10, 11, 12],

// [13, 14, 15, 16]];

console.log(rotate([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
], 1));

console.log(rotate([
    [1, 2],
    [3, 4]
], 1));



// 2 3 4 8

// 1 7 11 12

// 5 6 10 16

// 9 13 14 15

