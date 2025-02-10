function clearDigits(s: string): string {
    const charStack: string[] = [];
    
    for(const char of s) {
        if(char >= '0' && char <= '9') {
            charStack.pop();
        } else {
            charStack.push(char);
        }
    } 

    return charStack.join("");
};
