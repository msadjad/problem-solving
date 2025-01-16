type Frequency = {
    count: number,
    num: number,
}

function topKFrequent(nums: number[], k: number): number[] {
    const map = nums.reduce((counts, num) => {
        const count = counts.get(num) ?? 0;
        counts.set(num, count + 1);
        return counts; 
    }, new Map<number, number>());    

    let frequencies: Frequency[] = [];
    for(const [num, count] of map) {
        frequencies.push({
            count,
            num
        });
    }

    frequencies = frequencies.sort((a: Frequency, b: Frequency) => b.count - a.count);
    
    const topK: number[] = [];
    for(let i = 0 ; i<frequencies.length && i<k ; i++) {
        topK.push(frequencies[i].num);
    }

    return topK;
};
