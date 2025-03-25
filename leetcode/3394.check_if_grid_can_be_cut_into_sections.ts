type Node = {
    start: number,
    end: number,
    next: Node | null;
};

function checkValidCuts(n: number, rectangles: number[][]): boolean {
    const horizontal = rectangles.map((rectangle) => [rectangle[0], rectangle[2]]);
    const vertical = rectangles.map((rectangle) => [rectangle[1], rectangle[3]]);

    horizontal.sort((a: number[], b: number[]) => a[0] - b[0]);
    vertical.sort((a: number[], b: number[]) => a[0] - b[0]);

    const horizontalLinkedList = getLinkedList(horizontal);
    const verticalLinkedList = getLinkedList(vertical);

    const mergedHorizontal = mergeRectangles(horizontalLinkedList);
    const mergedVertical = mergeRectangles(verticalLinkedList);

    if ((mergedHorizontal && mergedHorizontal.next && mergedHorizontal.next.next) ||
        (mergedVertical && mergedVertical.next && mergedVertical.next.next)) {
        return true;
    }

    return false;
};

function getLinkedList(rectangles: number[][]): Node | null {
    if (rectangles.length === 0) {
        return null;
    }

    const start: Node = {
        start: rectangles[0][0],
        end: rectangles[0][1],
        next: null
    };

    let current = start;

    for (let i = 1; i < rectangles.length; i++) {
        current.next = {
            start: rectangles[i][0],
            end: rectangles[i][1],
            next: null
        };

        current = current.next;
    }

    return start;
}

function mergeRectangles(rectangles: Node | null): Node | null {
    if (rectangles === null) {
        return null;
    }

    let current = rectangles;
    while (current.next !== null) {
        const next = current.next;

        if (current.start <= next.start && next.end <= current.end) {
            current.next = next.next;
        } else if (next.start <= current.start && current.end <= next.end) {
            current.start = next.start;
            current.end = next.end;
            current.next = next.next;
        } else if ((current.start < next.start && next.start < current.end) || (next.start < current.end && current.end < next.end)) {
            current.end = next.end;
            current.next = next.next;
        } else {
            current = next;
        }
    }

    return rectangles;
}
