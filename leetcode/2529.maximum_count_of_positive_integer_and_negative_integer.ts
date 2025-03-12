function maximumCount(nums: number[]): number {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] === 0) {
            result = mid;
            right = mid - 1;
        } else if (nums[mid] < 0) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    result = result !== -1 ? result : left;
    const negatives = result;

    while(result < nums.length && nums[result] === 0) {
        result++;
    }

    const positives = result;

    return Math.max(nums.length - positives, negatives);
};
