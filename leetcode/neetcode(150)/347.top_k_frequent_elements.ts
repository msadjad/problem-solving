function topKFrequent(nums: number[], k: number): number[] {
    const numCount = new Map<number, number>();

    for(const num of nums) {
        numCount.set(num, (numCount.get(num) || 0) + 1);
    } 

    const numbersWithCount: {num: number, count: number}[] = [];

    for(const [key, value] of numCount) {
        numbersWithCount.push({num: key, count: value});
    }

    const result = numbersWithCount.sort((a, b) => b.count - a.count)
                                  .filter((numberWithCount, index) => index < k)
                                  .map(numberWithCount => numberWithCount.num);
    
    return result;
};
