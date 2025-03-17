function divideArray(nums: number[]): boolean {
    const numMap = new Map<number, number>();
    for(let i=0 ; i<nums.length ; i++) {
        const currentCount = numMap.get(nums[i]) ?? 0;
        numMap.set(nums[i], currentCount + 1);
    }

    const values = numMap.values();
    for(const value of values) {
        if(value % 2 !== 0) {
            return false;
        }
    }

    return true;
};
