function minimizeXor(num1: number, num2: number): number {
    const numberOfPossible1s = num2.toString(2).split('').filter((char) => char === '1').length;
    const num1Binary = num1.toString(2);

    let response = "";
    let left = numberOfPossible1s;

    for (let i = 0; i < num1Binary.length; i++) {
        if (num1Binary[i] === '1' && left > 0) {
            left -= 1;
            response += '1';
        } else {
            response += '0';
        }
    }

    let result = 0;
    for (let i = response.length - 1; i >= 0; i--) {
        if (response[i] === '1') {
            result += Math.pow(2, response.length - 1 - i);
        } else if (left > 0) {
            left -= 1;
            result += Math.pow(2, response.length - 1 - i);
        }
    }

    let count = 0;
    while(left > 0) {
        result += Math.pow(2, response.length + count);
        count++;
        left -= 1;
    }

    return result;
};
