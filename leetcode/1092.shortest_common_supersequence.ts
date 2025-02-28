function shortestCommonSupersequence(str1: string, str2: string): string {
    const str1Length = str1.length;
    const str2Length = str2.length;

    const dp = Array.from({ length: str1Length + 1 }, () => Array(str2Length + 1).fill(0));

    for (let row = 0; row <= str1Length; row++) {
        dp[row][0] = row;
    }

    for (let col = 0; col <= str2Length; col++) {
        dp[0][col] = col;
    }

    for (let row = 1; row <= str1Length; row++) {
        for (let col = 1; col <= str2Length; col++) {
            if (str1[row - 1] === str2[col - 1]) {
                dp[row][col] = dp[row - 1][col - 1] + 1;
            } else {
                dp[row][col] = Math.min(dp[row - 1][col], dp[row][col - 1]) + 1;
            }
        }
    }

    let supersequence = "";
    let row = str1Length, col = str2Length;
    
    while (row > 0 && col > 0) {
        if (str1[row - 1] === str2[col - 1]) {
            supersequence += str1[row - 1];
            row--;
            col--;
        } else if (dp[row - 1][col] < dp[row][col - 1]) {
            supersequence += str1[row - 1];
            row--;
        } else {
            supersequence += str2[col - 1];
            col--;
        }
    }
    
    while (row > 0) {
        supersequence += str1[row - 1];
        row--;
    }
    
    while (col > 0) {
        supersequence += str2[col - 1];
        col--;
    }
    
    return supersequence.split('').reverse().join('');
}
