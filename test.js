import chai from 'chai';
import { createSpiral } from './createSpiral.js';

const assert = chai.assert;
chai.config.truncateThreshold = 0;

describe('Spiral test', function () {
    it('should return correct arrays', function () {
        assert.deepEqual(createSpiral(1), [[1]]);
        assert.deepEqual(createSpiral(3), [
            [1, 2, 3],
            [8, 9, 4],
            [7, 6, 5],
        ]);
        assert.deepEqual(createSpiral(4), [
            [1, 2, 3, 4],
            [12, 13, 14, 5],
            [11, 16, 15, 6],
            [10, 9, 8, 7],
        ]);
        assert.deepEqual(createSpiral(5), [
            [1, 2, 3, 4, 5],
            [16, 17, 18, 19, 6],
            [15, 24, 25, 20, 7],
            [14, 23, 22, 21, 8],
            [13, 12, 11, 10, 9],
        ]);
    });

    it('should return -1', function () {
        assert.deepEqual(createSpiral(-1), []);
        assert.deepEqual(createSpiral('2'), []);
        assert.deepEqual(createSpiral('4.5'), []);
    });
});
