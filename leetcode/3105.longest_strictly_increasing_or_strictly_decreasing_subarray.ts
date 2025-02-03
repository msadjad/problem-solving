enum State {
    INCREMENT,
    DECREMENT,
    EQUAL,
}

function longestMonotonicSubarray(nums: number[]): number {
    if(nums.length === 1) {
        return 1;
    }
    
    const changes: State[] = [];
    
    for(let i=1 ; i<nums.length ; i++) {
        if(nums[i] > nums[i-1]) {
            changes.push(State.INCREMENT);
        } else if(nums[i] < nums[i-1]) {
            changes.push(State.DECREMENT);
        } else {
            changes.push(State.EQUAL);
        }
    }

    let current = changes[0] != State.EQUAL ? 2 : 1;
    let maxLength = current;

    for(let i=1 ; i<changes.length ; i++) {
        if(changes[i] != State.EQUAL && changes[i] === changes[i-1]) {
            current += 1;
        } else if (changes[i] != State.EQUAL) {
            current = 2;
        } else {
            current = 1;
        }

        maxLength = Math.max(current, maxLength)
    }

    return maxLength;
};
