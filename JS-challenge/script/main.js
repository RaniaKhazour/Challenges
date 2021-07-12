/**
 * @file: main.js
 * @author Rania Khazour
 * Challenge part 1
 * 
 * This file checks whether some strings are anagrams of each other or not
 */

/** 
 * @description Function that orders a string alphabetically, ignoring white spaces.
 * @returns {String}  the string ordered alphabetically
 * @param {String} str - string to be ordered
 */
 function orderString(str) {
    return str.replace(/\s/g, '').split('').sort().join('');
}

/** 
 * @description Function that takes an array of strings and will determine which words in the array are exact anagrams 
 * of each other (ignoring spaces) and will return an array of arrays containing all the strings anagrams together.
 * @returns {Array} arrayResult - an array of arrays containing all the strings checked if anagrams
 * @param {Array} arrayInput - array containing the list of strings to check, given by the user 
 */
function anagramCheck(arrayInput) {

    let arrayAnagram = [];
    let arrayResult = [];

    for(let i=0; i<arrayInput.length; i++) {

        if (arrayInput[i] !== "CHECKED") {
            let strToCompare = orderString(arrayInput[i]); 

            for (let j=0; j<arrayInput.length; j++) {
                if (arrayInput[j] !== "CHECKED") {
                    if (strToCompare === orderString(arrayInput[j])) {
                        arrayAnagram.push(arrayInput[j]);
                        arrayInput[j] = "CHECKED";
                    } 
                }
            }  

            arrayResult.push(arrayAnagram);
        }
        arrayAnagram = [];
    }

    return arrayResult;
}

// Test 
let result = anagramCheck(['rope', 'pore', 'repo', 'red rum', 'murder', 'listen', 'silent', 'endeavour']);
console.log(result);
 