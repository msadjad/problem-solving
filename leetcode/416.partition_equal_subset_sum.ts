function canPartition(nums: number[]): boolean {
    let sums: number = 0
    for (const num of nums) {
        sums += num
    }

    if (sums % 2 === 1) {
        return false
    }

    sums /= 2
    const dp: boolean[] = new Array(sums + 1).fill(false)

    dp[0] = true

    for (const num of nums) {
        for (let sum = sums; sum >= num; sum--) {
            dp[sum] = dp[sum] || dp[sum - num]
        }
    }
    
    return dp[sums]
}
