function minimumIndex(nums: number[]): number {
    const n = nums.length;

    // Step 1: Find the dominant element
    const countMap = new Map<number, number>();
    for (const num of nums) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
    }

    let dominant = -1;
    for (const [key, value] of countMap) {
        if (value > Math.floor(n / 2)) {
            dominant = key;
            break;
        }
    }

    if (dominant === -1) return -1;

    // Step 2: Iterate and find valid split index
    let leftCount = 0;
    const totalCount = countMap.get(dominant)!;

    for (let i = 0; i < n - 1; i++) {
        if (nums[i] === dominant) {
            leftCount++;
        }

        const leftSize = i + 1;
        const rightSize = n - leftSize;
        const rightCount = totalCount - leftCount;

        if (leftCount > Math.floor(leftSize / 2) && rightCount > Math.floor(rightSize / 2)) {
            return i;
        }
    }

    return -1;
}
