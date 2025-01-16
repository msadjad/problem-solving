function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();

    for(let i=0 ; i<nums.length ; i++) {
        const index = map.get(target - nums[i]);

        if(index != undefined) {
            return [index, i];
        }

        map.set(nums[i], i);
    } 
};
