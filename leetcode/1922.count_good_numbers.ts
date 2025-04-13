function countGoodNumbers(n: number): number {
    const MOD = 1_000_000_007n;

    return Number(quickPower(5n, BigInt(n + 1) / 2n, MOD) * quickPower(4n, BigInt(n) / 2n, MOD) % MOD);
};

function quickPower(x: bigint, y: bigint, MOD: bigint): bigint {
    let result: bigint = 1n;
    let multiplier: bigint = x;

    while (y > 0n) {
        if (y % 2n === 1n) {
            result = (result * multiplier) % MOD;
        }
        multiplier = (multiplier * multiplier) % MOD;

        y = y / 2n;
    }

    return result;
}
