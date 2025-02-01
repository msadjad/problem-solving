function isArraySpecial(nums: number[]): boolean {
    let parity = nums[0] % 2 === 0;
    for (let i = 1; i < nums.length; i++) {
        let currParity = nums[i] % 2 === 0;
        if (currParity === parity) {
            return false;
        }
        parity = !parity;
    }
    return true;
};
