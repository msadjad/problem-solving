function minimumOperations(nums: number[]): number {
    const numberCount = nums.reduce((map, num) => {
        const count = map.get(num) ?? 0;
        map.set(num, count + 1);
        return map;
    }, new Map<number, number>());

    const duplicateNumbers = new Set<number>(
        Array.from(numberCount.entries())
                .filter(([key, value]) => value > 1)
                .map(([key, value]) => key)
    );

    let count = 0;
    let position = 0;

    while(duplicateNumbers.size > 0) {
        count += 1;
        if(position < nums.length - 3) {
            const first = position, second = position + 1, third = position + 2;

            const firstCount = numberCount.get(nums[first]) ?? 1;
            numberCount.set(nums[first], firstCount - 1);
            if(firstCount <= 2) {
                duplicateNumbers.delete(nums[first]);
            }

            const secondCount = numberCount.get(nums[second]) ?? 1;
            numberCount.set(nums[second], secondCount - 1);
            if(secondCount <= 2) {
                duplicateNumbers.delete(nums[second]);
            }

            const thirdCount = numberCount.get(nums[third]) ?? 1;
            numberCount.set(nums[third], thirdCount - 1);
            if(thirdCount <= 2) {
                duplicateNumbers.delete(nums[third]);
            }

            position += 3;
        } else {
            duplicateNumbers.clear();
        }
    }

    return count;
};
