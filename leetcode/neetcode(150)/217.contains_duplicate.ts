function containsDuplicate(nums: number[]): boolean {
    const set = new Set<number>();

    for(let i=0 ; i<nums.length; i++) {
        if(set.has(nums[i])) {
            return true;
        }
        set.add(nums[i]);
    }


    return false;
};
