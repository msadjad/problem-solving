function tupleSameProduct(nums: number[]): number {
    const multiplies = new Map<number, number>(); 

    for(let i=0 ; i<nums.length ; i++) {
        for(let j=i+1 ; j<nums.length ; j++) {
            const value = multiplies.get(nums[i] * nums[j]) ?? 0;
            multiplies.set(nums[i] * nums[j], value + 1);
        }
    }

    let sum = 0;

    for(const [key, value] of multiplies){
        if(value > 1) {
            const pairsOfEqualProduct = (value - 1) * value / 2;
            sum += 8 * pairsOfEqualProduct;
        }
    }

    return sum;
};
