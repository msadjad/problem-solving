function maximumSum(nums: number[]): number {
    const digitSumGroups = new Map<number, number>();
    let maxSum = -1;

    for (let i = 0; i < nums.length; i++) {
        const digitSum = getDigitsSum(nums[i]);
        const maxNumber = digitSumGroups.get(digitSum) ?? -1;
        if (maxNumber != -1) {
            maxSum = Math.max(maxSum, maxNumber + nums[i]);
        }
        digitSumGroups.set(digitSum, Math.max(maxNumber, nums[i]));
    }

    return maxSum;
};

function getDigitsSum(value: number) {
    let result = 0;

    for (let num = value; num != 0; num = (num / 10) | 0) {
        result += num % 10;
    }

    return result;
}
