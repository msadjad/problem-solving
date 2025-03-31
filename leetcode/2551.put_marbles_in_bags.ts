function putMarbles(weights: number[], k: number): number {
    const n = weights.length;    
    const pairWeights = Array.from({length: n - 1}, () => 0);
    for(let i=0 ; i<n-1; i++) {
        pairWeights[i] += weights[i] + weights[i+1];
    }

    pairWeights.sort((a, b) => a - b);

    let answer = 0;
    for(let i=0; i<k-1; i++) {
        answer += pairWeights[n - 2 - i] - pairWeights[i];
    }

    return answer;
};
