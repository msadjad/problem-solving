function gridGame(grid: number[][]): number {
    const length = grid[0].length;

    const prefixSumTop = new Array(length).fill(0);
    const prefixSumBottom = new Array(length).fill(0);

    prefixSumTop[0] = grid[0][0];
    prefixSumBottom[0] = grid[1][0];

    for (let i = 1; i < length; i++) {
        prefixSumTop[i] = prefixSumTop[i - 1] + grid[0][i];
        prefixSumBottom[i] = prefixSumBottom[i - 1] + grid[1][i];
    }

    let result = Infinity;

    for (let i = 0; i < length; i++) {
        const pointsTop = prefixSumTop[length - 1] - prefixSumTop[i];
        const pointsBottom = i > 0 ? prefixSumBottom[i - 1] : 0;

        const secondRobotPoints = Math.max(pointsTop, pointsBottom);

        result = Math.min(result, secondRobotPoints);
    }

    return result;
}
