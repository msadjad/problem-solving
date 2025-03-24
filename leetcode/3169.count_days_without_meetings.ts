type Node = {
    start: number,
    end: number,
    next: Node | null;
};

function countDays(days: number, meetings: number[][]): number {
    meetings.sort((a: number[], b: number[]) => a[0] - b[0]);
    const meetingsLinkedList = getLinkedList(meetings);
    const mergedMeetings = mergeMeetings(meetingsLinkedList);
    let count = days; 
    let current = mergedMeetings;
    while(current != null) {
        count -= (current.end - current.start + 1);
        current = current.next;
    }

    return count;
};

function getLinkedList(meetings: number[][]): Node | null {
    if(meetings.length === 0) {
        return null;
    }

    const start: Node = {
        start: meetings[0][0],
        end: meetings[0][1],
        next: null
    };

    let current = start;

    for(let i=1 ; i<meetings.length ; i++) {
        current.next = {
            start: meetings[i][0],
            end: meetings[i][1],
            next: null
        };

        current = current.next;
    }

    return start;
}

function mergeMeetings(meetings: Node | null): Node | null {
    if(meetings === null) {
        return null;
    }

    let current = meetings; 
    while(current.next !== null) {
        const next = current.next;

        if(current.start <= next.start && next.end <= current.end) {
            current.next = next.next;
        } else if(next.start <= current.start && current.end <= next.end) {
            current.start = next.start;
            current.end = next.end;
            current.next = next.next;
        } else if((current.start <= next.start && next.start <= current.end) || (next.start <= current.end && current.end <= next.end)) {
            current.end = next.end;
            current.next = next.next;
        } else {
            current = next;
        }
    }

    return meetings;
}
