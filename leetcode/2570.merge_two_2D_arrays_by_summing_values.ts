function mergeArrays(nums1: number[][], nums2: number[][]): number[][] {
    let first = 0, second = 0;
    let result: number[][] = [];

    while (first != nums1.length && second != nums2.length) {
        if (nums1[first][0] === nums2[second][0]) {
            result.push([nums1[first][0], nums1[first][1] + nums2[second][1]]);
            first++;
            second++;
        } else if (nums1[first][0] < nums2[second][0]) {
            result.push([...nums1[first]]);
            first++;
        } else {
            result.push([...nums2[second]]);
            second++;
        }
    }

    while (first != nums1.length) {
        result.push([...nums1[first]]);
        first++;
    }

    while (second != nums2.length) {
        result.push([...nums2[second]]);
        second++;
    }


    return result;
};
