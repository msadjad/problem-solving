function countGoodTriplets(arr: number[], a: number, b: number, c: number): number {
    const length = arr.length;
    const sum = new Array(1001).fill(0);
    let answer = 0;

    for (let j = 0; j < length; j++) {
        for (let k = j + 1; k < length; k++) {
            if (Math.abs(arr[j] - arr[k]) <= b) {
                const leftJ = arr[j] - a, rightJ = arr[j] + a;
                const leftK = arr[k] - c, rightK = arr[k] + c;
                const left = Math.max(0, Math.max(leftJ, leftK));
                const right = Math.min(1000, Math.min(rightJ, rightK));
                if (left <= right) {
                    if (left === 0) {
                        answer += sum[right];
                    } else {
                        answer += sum[right] - sum[left - 1];
                    }
                }
            }
        }
        for (let k = arr[j]; k <= 1000; k++) {
            sum[k] += 1;
        }
    }

    return answer;
};
