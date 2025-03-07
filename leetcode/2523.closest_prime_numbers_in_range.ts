function closestPrimes(left: number, right: number): number[] {
    const isPrime = getIsPrime(right);
    const primesInRange: number[] = [];

    for (let i = 0; i <= right; i++) {
        if (isPrime[i] && i >= left && i <= right) {
            primesInRange.push(i);
        }
    }

    let minDiff = Infinity;
    let num1 = -1, num2 = -1;

    for (let i = 0; i < primesInRange.length - 1; i++) {
        if (primesInRange[i + 1] - primesInRange[i] < minDiff) {
            num1 = primesInRange[i];
            num2 = primesInRange[i + 1];
            minDiff = primesInRange[i + 1] - primesInRange[i];
        }
    }

    return [num1, num2]
};

function getIsPrime(max: number): boolean[] {
    const isPrime: boolean[] = Array.from({ length: max + 1 }, () => true);
    isPrime[0] = false;
    isPrime[1] = false;

    for (let i = 2; i * i <= max; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= max; j += i) {
                isPrime[j] = false;
            }
        }
    }

    return isPrime;
}
