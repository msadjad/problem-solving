/**
 * Encodes a list of strings to a single string.
 */
function encode(strs: string[]): string {
    let encoded = "";

    for(const word of strs) {
        for(let i=0 ; i<word.length ; ) {
            let count = 1;
            let j = i + 1;
            while(j < word.length && word[j] === word[i] && count < 9) {
                count += 1;
                j++;
            }
    
            encoded += `${count}${word[i]}`;
            i = j;
        } 
        encoded += ',';
    }

    return encoded;
};

/**
 * Decodes a single string to a list of strings.
 */
function decode(s: string): string[] {
    let decode = [];
    let word = "";

    for(let i=0 ; i<s.length ; i++) {
        let count = parseInt(s[i]); 

        if(!isNaN(count)) {
            for(let j=0 ; j<count ; j++) {
                word += s[i + 1]             
            }

            i = i + 1;
        } else {
            decode.push(word);
            word = "";
        }
    }

    return decode;
};

/**
 * Your functions will be called as such:
 * decode(encode(strs));
 */