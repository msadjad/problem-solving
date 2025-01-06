function minOperations(boxes: string): number[] {
    const result = (new Array(boxes.length)).fill(0);
    const fromLeft = (new Array(boxes.length)).fill(0);
    const fromRight = (new Array(boxes.length)).fill(0);

    const LENGTH = boxes.length;
    let ballsFromLeft = boxes[0] === '1' ? 1 : 0;
    let ballsFromRight = boxes[LENGTH - 1] === '1' ? 1 : 0;

    for(let i=1 ; i<boxes.length; i++) {
        fromLeft[i] = ballsFromLeft + fromLeft[i-1];
        fromRight[LENGTH - i - 1] = ballsFromRight + fromRight[LENGTH - i]
        if(boxes[i] === '1') {
            ballsFromLeft += 1;
        }
        if(boxes[LENGTH - i - 1] === '1') {
            ballsFromRight += 1;
        }
    }

    for(let i=0 ; i<boxes.length ; i++) {
        result[i] = fromLeft[i] + fromRight[i];
    }
    
    return result;
};