function removeOccurrences(s: string, part: string): string {
    let index = s.indexOf(part);
    while(index != -1) {
        s = s.substring(0, index) + "" + s.substring(index + part.length, s.length);
        index = s.indexOf(part);
    }

    return s;
};
