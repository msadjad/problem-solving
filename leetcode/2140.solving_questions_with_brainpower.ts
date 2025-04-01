function mostPoints(questions: number[][]): number {
    const length = questions.length;
    const maxPoints: number[] = Array.from({ length }, () => -Infinity);
    maxPoints[length - 1] = questions[length - 1][0];

    for (let i = length - 2; i >= 0; i--) {
        if (i + questions[i][1] >= length - 1) {
            maxPoints[i] = Math.max(maxPoints[i + 1], questions[i][0]);
        } else {
            maxPoints[i] = Math.max(maxPoints[i + 1], questions[i][0] + maxPoints[i + questions[i][1] + 1]);
        }
    }

    return maxPoints[0];
};
