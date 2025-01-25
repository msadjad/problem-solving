function lexicographicallySmallestArray(nums: number[], limit: number): number[] {
    const sortedList = [...nums].sort((a, b) => a - b); 
    const groups = new Map<number, number>();
    const groupLists = new Map<number, number[]>();
    let groupNumber = 0;

    groups.set(sortedList[0], groupNumber);
    groupLists.set(groupNumber, [sortedList[0]]);

    for(let i=1 ; i<sortedList.length ; i++) {
        if(Math.abs(sortedList[i-1] - sortedList[i]) > limit) {
            const groupList = groupLists.get(groupNumber) ?? [];
            groupLists.set(groupNumber, groupList.sort((a, b) => a - b));
            groupNumber += 1;
            groupLists.set(groupNumber, [])
        } 

        groups.set(sortedList[i], groupNumber);
        const groupList = groupLists.get(groupNumber) ?? [];
        groupList.push(sortedList[i]);
        groupLists.set(groupNumber, groupList);
    }

    const groupListIndex = new Array(groupLists.size).fill(0);
    const result: number[] = [];

    for(let i=0 ; i<nums.length ; i++) {
        const group = groups.get(nums[i]) ?? 0;
        const groupList = groupLists.get(group) ?? [];
        result.push(groupList[groupListIndex[group]++]);
    }

    return result;
};
