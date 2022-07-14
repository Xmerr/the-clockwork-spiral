const directions = {
    right: 'r',
    left: 'l',
    down: 'd',
    up: 'u',
};

/**
 * Take the passed in size and creates a spiral with numbers
 * @param {integer} size - how many columns and rows the spiral should have
 * @returns {[Array[Array[integer]]]} A 2 dimensional array which can be rendered out to make a spirit
 */
export const createSpiral = size => {
    if (!size || typeof size === 'string' || isNaN(size) || size <= 0 || size % 1 !== 0) {
        return [];
    }

    const output = [];
    let direction = directions.right;
    let current = 1;
    const largest = size * size; // I ran a test on this and Math.pow(size, 2) is about 279% slower than size * size
    let currentCursor = {
        col: 0,
        row: 0,
    };

    for (let i = 0; i < size; i++) {
        output[i] = [];
    }

    /**
     * Using the current direction - returns what would be the next cursor
     */
    const nextCursor = () => {
        switch (direction) {
            case directions.right:
                return {
                    ...currentCursor,
                    col: currentCursor.col + 1,
                };
            case directions.left:
                return {
                    ...currentCursor,
                    col: currentCursor.col - 1,
                };
            case directions.down:
                return {
                    ...currentCursor,
                    row: currentCursor.row + 1,
                };
            case directions.up:
                return {
                    ...currentCursor,
                    row: currentCursor.row - 1,
                };
        }
    };

    /**
     * Validates the passed in cursor is valid as the next cursor
     * @param {Object} cursor - the cursor to be validated
     * @returns false if the cursor cannot be used next
     */
    const validateCursor = cursor => {
        if (
            Object.values(cursor).some(arg => arg < 0 || arg >= size) ||
            output[cursor.row][cursor.col]
        ) {
            return false;
        }
        return true;
    };

    /**
     * Updates the direction to the next direction
     */
    const changeDirection = () => {
        switch (direction) {
            case directions.right:
                direction = directions.down;
                break;
            case directions.left:
                direction = directions.up;
                break;
            case directions.down:
                direction = directions.left;
                break;
            case directions.up:
                direction = directions.right;
                break;
        }
    };

    while (current <= largest) {
        output[currentCursor.row][currentCursor.col] = current++;

        let next = nextCursor();
        if (!validateCursor(next)) {
            changeDirection();
            next = nextCursor();
        }

        currentCursor = next;
    }

    return output;
};
