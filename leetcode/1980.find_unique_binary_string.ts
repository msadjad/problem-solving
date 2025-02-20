function findDifferentBinaryString(nums: string[]): string {
    const values = nums.reduce((values, num) => {
        values.add(parseInt(num, 2));
        return values;
    }, new Set<number>());

    const max = Math.pow(2, nums.length);
    for(let i=0 ; i<max ; i++) {
        if(!values.has(i)) {
            return convertToBinary(i, nums[0].length);
        }
    }
};

function convertToBinary(value: number, length: number): string {
    let binary = value.toString(2);

    while(binary.length != length) {
        binary = '0' + binary;
    }

    return binary;
}
