function power(base: bigint, exp: bigint, mod: bigint): bigint {
    let res = 1n;
    base %= mod;
    while (exp > 0n) {
        if (exp % 2n === 1n) {
            res = (res * base) % mod;
        }
        base = (base * base) % mod;
        exp = exp / 2n;
    }
    return res;
}

function getPrimeScores(maxVal: number): number[] {
    const scores = new Array(maxVal + 1).fill(0);
    for (let i = 2; i <= maxVal; i++) {
        if (scores[i] === 0) {
            for (let j = i; j <= maxVal; j += i) {
                scores[j]++;
            }
        }
    }
    return scores;
}

function maximumScore(nums: number[], k: number): number {
    const n = nums.length;
    const MOD = 1_000_000_007n;

    if (n === 0 || k === 0) {
        return 1;
    }

    let maxVal = 0;
    for (const num of nums) {
        maxVal = Math.max(maxVal, num);
    }
    const primeScoreMap = getPrimeScores(maxVal);
    const ps = nums.map(num => primeScoreMap[num]);

    const L = new Array(n).fill(-1);
    let stack: number[] = [];
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && ps[stack[stack.length - 1]] < ps[i]) {
            stack.pop();
        }
        if (stack.length > 0) {
            L[i] = stack[stack.length - 1];
        }
        stack.push(i);
    }

    const R = new Array(n).fill(n);
    stack = [];
    for (let i = n - 1; i >= 0; i--) {
        while (stack.length > 0 && ps[stack[stack.length - 1]] <= ps[i]) {
            stack.pop();
        }
        if (stack.length > 0) {
            R[i] = stack[stack.length - 1];
        }
        stack.push(i);
    }

    interface Candidate {
        value: number;
        count: bigint;
    }

    const candidates: Candidate[] = [];
    for (let i = 0; i < n; i++) {
        const leftDist = BigInt(i - L[i]);
        const rightDist = BigInt(R[i] - i);
        const count_i = leftDist * rightDist;

        if (count_i > 0n) {
            candidates.push({ value: nums[i], count: count_i });
        }
    }

    candidates.sort((a, b) => b.value - a.value);

    let score = 1n;
    let remaining_k = BigInt(k);

    for (const candidate of candidates) {
        if (remaining_k === 0n) {
            break;
        }

        const num_val = BigInt(candidate.value);
        const available_count = candidate.count;

        const use_count = remaining_k < available_count ? remaining_k : available_count;

        if (use_count > 0n) {
            const power_val = power(num_val, use_count, MOD);
            score = (score * power_val) % MOD;
            remaining_k -= use_count;
        }
    }

    return Number(score);
}
