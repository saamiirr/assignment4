// Input: strs = ["flower","flow","flight"]
// Output: "fl"

var longestCommonPrefix = function (strs) {
  res = "";

  for (let i = 0; i < strs[0].length; i++) {
    for (let j = 0; j < strs.length; j++) {
      if ((strs[j].length === i || strs[0][i]) !== strs[j][i]) return res;
    }

    res += strs[0][i];
  }
  return res;
};

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
