function largestDivisibleSubset(nums: number[]): number[] {
    nums.sort((a, b) => a - b);
    const length = nums.length;
    const neighbors: number[][] = Array.from({ length }, () => []);

    for (let i = 0; i < length; i++) {
        for (let j = i + 1; j < length; j++) {
            if (nums[j] % nums[i] === 0) {
                neighbors[i].push(j);
            }
        }
    }

    const longestParent = Array.from({ length }, (_, i) => [i, 1]);
    let longestEnd = 0;

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < neighbors[i].length; j++) {
            const neighbor = neighbors[i][j];
            const currentLength = longestParent[neighbor][1];
            if (currentLength < longestParent[i][1] + 1) {
                longestParent[neighbor] = [i, longestParent[i][1] + 1]
            }

            if (longestParent[neighbor][1] > longestParent[longestEnd][1]) {
                longestEnd = neighbor;
            }
        }
    }

    const result: number[] = [nums[longestEnd]];
    while (longestParent[longestEnd][0] != longestEnd) {
        longestEnd = longestParent[longestEnd][0];
        result.push(nums[longestEnd]);
    }

    return result;
};
