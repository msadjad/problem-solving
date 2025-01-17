function doesValidArrayExist(derived: number[]): boolean {
    let XOR = 0;
    for(const value of derived) {
        XOR = XOR ^ value;
    } 

    return XOR === 0;
};
