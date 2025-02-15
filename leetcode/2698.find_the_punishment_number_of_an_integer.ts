function punishmentNumber(n: number): number {
    let punishmentNum = 0;

    for (let i = 1; i <= n; i++) {
        const squareNum = i * i;
        if (canPartition(squareNum.toString(), i)) {
            punishmentNum += squareNum;
        }
    }

    return punishmentNum;
}

function canPartition(stringNum: string, target: number): boolean {
    if (stringNum === "" && target === 0) {
        return true;
    }
    if (target < 0) {
        return false;
    }

    for (let index = 0; index < stringNum.length; index++) {
        const left = stringNum.substring(0, index + 1);
        const right = stringNum.substring(index + 1);
        const leftNum = Number(left);

        if (canPartition(right, target - leftNum)) { return true; }
    }

    return false;
}
