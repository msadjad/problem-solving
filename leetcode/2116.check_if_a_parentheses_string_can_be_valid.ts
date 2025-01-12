function canBeValid(s: string, locked: string): boolean {
    if(s.length % 2 != 0) {
        return false;
    }

    let [openBrackets, unlocked] = [[], []];

    for (let i = 0; i < s.length; i++) {
        if(locked[i] === '0') {
            unlocked.push(i);
        }
        else if (s[i] === '(') {
            openBrackets.push(i);
        }
        else if (s[i] === ')') {
            if(openBrackets.length != 0) {
                openBrackets.pop();
            }
            else if(unlocked.length != 0) {
                unlocked.pop();
            }
            else {
                return false;
            }
        }
    }

    while(openBrackets.length > 0 && unlocked.length > 0
    && openBrackets[openBrackets.length - 1] < unlocked[unlocked.length - 1]) {
        openBrackets.pop();
        unlocked.pop();
    }

    if(openBrackets.length > 0) {
        return false;
    }

    return true;
};
