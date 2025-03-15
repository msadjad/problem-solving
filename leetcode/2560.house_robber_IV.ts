function minCapability(nums: number[], k: number): number {
    let minReward = 1;
    let maxReward = nums.reduce((max, value) => Math.max(max, value));
    const totalHouses = nums.length;

    while (minReward < maxReward) {
        const midReward = Math.floor((minReward + maxReward) / 2);
        let possibleThefts = 0;

        for (let i = 0; i < totalHouses; ++i) {
            if (nums[i] <= midReward) {
                possibleThefts++;
                i++;
            }
        }

        if (possibleThefts >= k) {
            maxReward = midReward;
        } else {
            minReward = midReward + 1;
        }
    }
    
    return minReward;
};
