function minZeroArray(nums: number[], queries: number[][]): number {
    const length = nums.length;
    let sum = 0, k = 0;
    const differenceArray = Array.from({ length: length + 1 }, () => 0);

    for (let i = 0; i < length; i++) {
        while (sum + differenceArray[i] < nums[i]) {
            k++;
            if (k > queries.length) {
                return -1;
            }

            let [left, right, val] = queries[k - 1];
            if(right >= i) {
                differenceArray[Math.max(left, i)] += val;
                differenceArray[right + 1] -= val;
            }
        }

        sum += differenceArray[i];
    }

    return k;
};
