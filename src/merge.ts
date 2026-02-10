/**
 * Merges three sorted integer arrays into a single array sorted in ascending order.
 *
 * Constraints:
 *   - collection_1 is sorted in **descending** order (max → min).
 *   - collection_2 is sorted in **ascending** order (min → max).
 *   - collection_3 is sorted in **ascending** order (min → max).
 *   - No built-in sort function is used.
 *
 * Algorithm:
 *   1. Reverse-iterate collection_1 so it becomes an ascending stream.
 *   2. Perform a 3-way merge (like the merge step of merge-sort) picking
 *      the smallest current head among the three streams at each step.
 *
 * Time:  O(n1 + n2 + n3)
 * Space: O(n1 + n2 + n3)
 */
export function merge(
    collection1: number[],
    collection2: number[],
    collection3: number[],
): number[] {
    const result: number[] = [];

    // Pointer for collection_1 — start from the end (smallest element) to read ascending
    let i = collection1.length - 1;
    // Pointers for collection_2 and collection_3 — start from the beginning
    let j = 0;
    let k = 0;

    while (i >= 0 && j < collection2.length && k < collection3.length) {
        const a = collection1[i];
        const b = collection2[j];
        const c = collection3[k];

        if (a <= b && a <= c) {
            result.push(a);
            i--;
        } else if (b <= a && b <= c) {
            result.push(b);
            j++;
        } else {
            result.push(c);
            k++;
        }
    }

    // Two remaining — collection_1 & collection_2
    while (i >= 0 && j < collection2.length) {
        const a = collection1[i];
        const b = collection2[j];
        if (a <= b) {
            result.push(a);
            i--;
        } else {
            result.push(b);
            j++;
        }
    }

    // Two remaining — collection_1 & collection_3
    while (i >= 0 && k < collection3.length) {
        const a = collection1[i];
        const c = collection3[k];
        if (a <= c) {
            result.push(a);
            i--;
        } else {
            result.push(c);
            k++;
        }
    }

    // Two remaining — collection_2 & collection_3
    while (j < collection2.length && k < collection3.length) {
        const b = collection2[j];
        const c = collection3[k];
        if (b <= c) {
            result.push(b);
            j++;
        } else {
            result.push(c);
            k++;
        }
    }

    // Drain remaining elements from each collection
    while (i >= 0) {
        result.push(collection1[i]);
        i--;
    }
    while (j < collection2.length) {
        result.push(collection2[j]);
        j++;
    }
    while (k < collection3.length) {
        result.push(collection3[k]);
        k++;
    }

    return result;
}
