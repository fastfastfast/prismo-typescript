import { merge } from "./merge";

describe("merge", () => {
    // ---------------------------------------------------------------
    // Basic functionality
    // ---------------------------------------------------------------
    it("should merge three non-empty sorted arrays into one ascending array", () => {
        // collection_1: descending
        // collection_2: ascending
        // collection_3: ascending
        const c1 = [9, 7, 5, 3, 1];
        const c2 = [2, 4, 6];
        const c3 = [0, 8, 10];

        expect(merge(c1, c2, c3)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    // ---------------------------------------------------------------
    // Empty array handling
    // ---------------------------------------------------------------
    it("should handle collection_1 being empty", () => {
        expect(merge([], [1, 3, 5], [2, 4, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should handle collection_2 being empty", () => {
        expect(merge([5, 3, 1], [], [2, 4, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should handle collection_3 being empty", () => {
        expect(merge([5, 3, 1], [2, 4, 6], [])).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should handle two empty arrays", () => {
        expect(merge([], [], [1, 2, 3])).toEqual([1, 2, 3]);
        expect(merge([], [1, 2, 3], [])).toEqual([1, 2, 3]);
        expect(merge([3, 2, 1], [], [])).toEqual([1, 2, 3]);
    });

    it("should return empty array when all three arrays are empty", () => {
        expect(merge([], [], [])).toEqual([]);
    });

    // ---------------------------------------------------------------
    // Duplicates
    // ---------------------------------------------------------------
    it("should handle duplicate values across arrays", () => {
        const c1 = [5, 3, 1];
        const c2 = [1, 3, 5];
        const c3 = [1, 3, 5];

        expect(merge(c1, c2, c3)).toEqual([1, 1, 1, 3, 3, 3, 5, 5, 5]);
    });

    it("should handle duplicate values within the same array", () => {
        const c1 = [5, 5, 3, 3];
        const c2 = [2, 2, 4];
        const c3 = [1, 1, 6];

        expect(merge(c1, c2, c3)).toEqual([1, 1, 2, 2, 3, 3, 4, 5, 5, 6]);
    });

    // ---------------------------------------------------------------
    // Negative numbers
    // ---------------------------------------------------------------
    it("should handle negative numbers", () => {
        const c1 = [3, 0, -2, -5];
        const c2 = [-10, -3, 1];
        const c3 = [-7, -1, 4];

        expect(merge(c1, c2, c3)).toEqual([-10, -7, -5, -3, -2, -1, 0, 1, 3, 4]);
    });

    // ---------------------------------------------------------------
    // Single-element arrays
    // ---------------------------------------------------------------
    it("should handle single-element arrays", () => {
        expect(merge([5], [1], [3])).toEqual([1, 3, 5]);
    });

    // ---------------------------------------------------------------
    // All same value
    // ---------------------------------------------------------------
    it("should handle arrays where all elements are the same value", () => {
        const c1 = [7, 7, 7];
        const c2 = [7, 7];
        const c3 = [7, 7, 7, 7];

        expect(merge(c1, c2, c3)).toEqual([7, 7, 7, 7, 7, 7, 7, 7, 7]);
    });

    // ---------------------------------------------------------------
    // Large arrays
    // ---------------------------------------------------------------
    it("should correctly merge large arrays", () => {
        // Build large arrays that satisfy the sort-order preconditions
        const size = 1000;

        // collection_1: descending — e.g. [2999, 2996, 2993, ..., 0]
        const c1: number[] = [];
        for (let v = (size - 1) * 3; v >= 0; v -= 3) {
            c1.push(v);
        }

        // collection_2: ascending — e.g. [1, 4, 7, ..., 2998]
        const c2: number[] = [];
        for (let v = 1; v < size * 3; v += 3) {
            c2.push(v);
        }

        // collection_3: ascending — e.g. [2, 5, 8, ..., 2999]
        const c3: number[] = [];
        for (let v = 2; v <= size * 3; v += 3) {
            c3.push(v);
        }

        const result = merge(c1, c2, c3);

        // Verify length
        expect(result.length).toBe(c1.length + c2.length + c3.length);

        // Verify ascending order (no built-in sort used to verify either!)
        for (let idx = 1; idx < result.length; idx++) {
            expect(result[idx]).toBeGreaterThanOrEqual(result[idx - 1]);
        }
    });

    // ---------------------------------------------------------------
    // Non-overlapping ranges
    // ---------------------------------------------------------------
    it("should handle non-overlapping ranges", () => {
        const c1 = [30, 20, 10]; // descending, all > c2 and c3
        const c2 = [1, 2, 3];
        const c3 = [4, 5, 6];

        expect(merge(c1, c2, c3)).toEqual([1, 2, 3, 4, 5, 6, 10, 20, 30]);
    });

    // ---------------------------------------------------------------
    // Interleaved values
    // ---------------------------------------------------------------
    it("should handle interleaved values across arrays", () => {
        const c1 = [10, 7, 4, 1]; // descending
        const c2 = [2, 5, 8, 11]; // ascending
        const c3 = [3, 6, 9, 12]; // ascending

        expect(merge(c1, c2, c3)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });
});
