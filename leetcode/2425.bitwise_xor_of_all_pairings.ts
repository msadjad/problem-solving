function xorAllNums(nums1: number[], nums2: number[]): number {
    let num3 = 0;

    if(nums2.length % 2 != 0) {
        for(let i=0 ; i<nums1.length ; i++) {
            num3 = num3 ^ nums1[i]
        }
    }
    
    if(nums1.length % 2 != 0) {
        for(let i=0 ; i<nums2.length ; i++) {
            num3 = num3 ^ nums2[i]
        }
    }

    return num3;
};
