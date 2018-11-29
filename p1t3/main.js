/**
 * Rotate a given matrix r times and prints the result
 *
 * @param {Number[]} arr
 * @param {Number} r The number of rotations that we want to perform
 */
module.exports = function rotate(arr, r) {
    const size = [arr.length, arr[0].length];
    const rotated = arr.map(x => x.slice()); // Copy each array

    // Work our way from the outermost rectangle into the innermost one
    for (let i = 0; i < Math.min(...size) / 2; i++) {
        const isolatedSize = size.map(m => m - i * 2);
        const coords = generateCoords(isolatedSize);
        coords.forEach(coord => {
            let newCoord = rotateCoordinate(isolatedSize, coord, getRelevantRotations(isolatedSize, r));
            newCoord = newCoord.map(x => x + i);
            coord = coord.map(x => x + i);
            rotated[newCoord[0]][newCoord[1]] = arr[coord[0]][coord[1]];
        });
    }

    rotated.forEach(line => {
        console.log(line.join(' '));
    });
}

/**
 * Find the target coordinate by walking through the matrix in a rectangular pattern
 *
 * @param {Number} size
 * @param {Number[]} coordinate
 * @param {Number} rotations
 * @return {Number[]}
 */
function rotateCoordinate(size, coordinate, rotations) {
    const boundaries = size.map(m => m - 1);
    let newCoordinate = coordinate.slice();

    while (rotations > 0) {
        [newCoordinate, rotations] = moveDown(newCoordinate, boundaries, rotations);
        [newCoordinate, rotations] = moveRight(newCoordinate, boundaries, rotations);
        [newCoordinate, rotations] = moveUp(newCoordinate, boundaries, rotations);
        [newCoordinate, rotations] = moveLeft(newCoordinate, boundaries, rotations);
    }

    return newCoordinate;
}

/**
 * Moves downward from the given coordinate if we need to
 *
 * @param {Number[]} coord
 * @param {Number[]} boundaries
 * @param {Number} rotations
 * @return {[Number[], Number]}
 */
function moveDown(coord, boundaries, rotations) {
    if (coord[0] >= 0 && coord[1] === 0) {
        coord[0] += rotations;
        rotations = 0;

        if (coord[0] > boundaries[0]) {
            rotations = coord[0] - boundaries[0];
            coord[0] = boundaries[0];
        }
    }

    return [coord, rotations];
}

/**
 * Moves right from the given coordinate if we need to
 *
 * @param {Number[]} coord
 * @param {Number[]} boundaries
 * @param {Number} rotations
 * @return {[Number[], Number]}
 */
function moveRight(coord, boundaries, rotations) {
    if (coord[0] === boundaries[0] && coord[1] < boundaries[1]) {
        coord[1] += rotations;
        rotations = 0;

        if (coord[1] > boundaries[1]) {
            rotations = coord[1] - boundaries[1];
            coord[1] = boundaries[1];
        }
    }

    return [coord, rotations];
}

/**
 * Moves upward from the given coordinate if we need to
 *
 * @param {Number[]} coord
 * @param {Number[]} boundaries
 * @param {Number} rotations
 * @return {[Number[], Number]}
 */
function moveUp(coord, boundaries, rotations) {
    if (coord[1] === boundaries[1] && coord[0] > 0) {
        coord[0] -= rotations;
        rotations = 0;

        if (coord[0] < 0) {
            rotations = 0 - coord[0];
            coord[0] = 0;
        }
    }

    return [coord, rotations];
}

/**
 * Moves left from the given coordinate if we need to
 *
 * @param {Number[]} coord
 * @param {Number[]} boundaries
 * @param {Number} rotations
 * @return {[Number[], Number]}
 */
function moveLeft(coord, boundaries, rotations) {
    if (coord[0] === 0 && coord[1] > 0) {
        coord[1] -= rotations;
        rotations = 0;

        if (coord[1] < 0) {
            rotations = 0 - coord[1];
            coord[1] = 0;
        }
    }

    return [coord, rotations];
}

/**
 * Find out the relevant number of rotations that we need to do so that we don't
 * end up rotating the matrix to its original state over and over in case the
 * number of rotations is >= 2 * (M + N - 2)
 *
 * @param {Number[]} size
 * @param {Number} rotations
 * @return {Number}
 */
function getRelevantRotations(size, rotations) {
    return rotations % size.reduce((acc, x) => (x - 1) * 2 + acc, 0);
}

/**
 * Given a matrix size, generate a list of coordinates that make up the outer rectangle
 *
 * @param {Number[]} size
 * @return {[Number[]]}
 */
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
