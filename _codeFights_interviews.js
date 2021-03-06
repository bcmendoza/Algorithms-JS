
/* Interview Practice: Arrays */

/* firstDuplicate
Given an array a that contains only numbers in the range from 1 to a.length, find the first duplicate number for which the second occurrence has the minimal index.
In other words, if there are more than 1 duplicated numbers, return the number for which the second occurrence has a smaller index than the second occurrence of the other number does.
If there are no such elements, return -1.
*/

function firstDuplicate(a) {
  for (let i of a) {
    // store abs val of elem, minus 1 to acct for a.length
    let pos = Math.abs(i) - 1
    // return abs val if neg found (see below)
    if (a[pos] < 0) return pos + 1
    // at first visit, convert val to neg
    a[pos] = a[pos] * -1
  }
  return -1 // if none revisited, return -1
}

/* firstNotRepeatingCharacter
Given a string s, find and return the first instance of a non-repeating character in it.
If there is no such character, return '_'.
*/

function firstNotRepeatingCharacter(s) {
    // create counter for each char
    let count = {};
    // for each elem, create key and store/increment count
    for (let e of s) {
        if (count[e]) count[e]++;
        else count[e] = 1;
    }
    // iterate keys for count === 1 and return key (char)
    for (let x in count) {
        if (count[x] === 1)
            return x;
    }
    // if no char returned, return empty symbol
    return '_';
}

/* rotateImage
You are given an n x n 2D matrix that represents an image. Rotate the image by 90 degrees (clockwise).
I couldn't get this one, but found this to be the most simple solution, irregardless of performance.
*/

function rotateImage(a) {
  let n = a.length - 1;
  // for starting with last row...
  for (let row = n; row >= 0; row--) {
    // starting with first elem...
    for (let col = 0; col <= n; col++) {
      // remove (shift) elem and push to new col
      let item = a[row].shift();
      a[col].push(item);
    }
  }
  return a;
}

/* sudoku2
Sudoku is a number-placement puzzle.
Fill a 9 × 9 grid with numbers in such a way that each column, each row
and each of the nine 3 × 3 sub-grids that compose the grid
all contain all of the numbers from 1 to 9 one time.
*/

function sudoku2(grid) {
    
  let duplicates = arr => {
    return (new Set(arr)).size !== arr.length
  }
  
  let valid = (x, y, rows = 3, cols = 3) => {
    let items = []
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i+x][j+y] !== '.') items.push(grid[i+x][j+y])
        }
    }
    if (duplicates(items)) return false
    return true
  }
  
  for (let i = 0; i < 9; i++) {
    if (!valid(i, 0, 1, 9)) return false
    if (!valid(0, i, 9, 1)) return false
  }
  
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
        if (!valid(i, j)) return false
    }
  }
  
  return true;
}

/* isCryptSolution
You have an array of strings crypt, the cryptarithm, and an an array containing the mapping of letters and digits, solution. The array crypt will contain three non-empty strings that follow the structure: [word1, word2, word3], which should be interpreted as the word1 + word2 = word3 cryptarithm.
If crypt, when it is decoded by replacing all of the letters in the cryptarithm with digits using the mapping in solution, becomes a valid arithmetic equation containing no numbers with leading zeroes, the answer is true. If it does not become a valid arithmetic solution, the answer is false.
*/

function isCryptSolution(crypt, solution) {
 let sol = {}
 solution.forEach(el => sol[el[0]] = el[1])
 
 let nums = []
 crypt.forEach(word => {
  let str = "";
  for (let i = 0; i < word.length; i++) { 
   str+= sol[word[i]]
  }
  let int = parseInt(str)
  if(str.length > 1 && str[0] === "0") return false
  nums.push(int)
 })
 
 if(nums[0] + nums[1] === nums[2]) return true
 return false
}