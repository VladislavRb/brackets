module.exports = function check(str, bracketsConfig) {
  function containsSimilarBrackets(brConf){
    if(brConf.every(x => x.length == 2)){
      return !brConf.every(x => x[0] != x[1]);
    }
    else{
      return false;
    }
  }

  function findClosingBracket(bracket){
    for(let bracketSet of bracketsConfig){
      if(bracket == bracketSet[0]){
        return bracketSet.length == 2 ? bracketSet[1] : bracketSet[0];
      }
    }
    return "";
  }

  function isOneTypeBracket(bracket, brConfig){
    for(let bracketSet of brConfig){
      if(bracketSet.includes(bracket)){
        return bracketSet.length == 1;
      }
    }
    return false;
  }

  function closingBracketPos(openingBr, closingBr, str){
    if(isOneTypeBracket(openingBr, bracketsConfig)){
      for(let i = str.length - 1; i > 0; i--){
        if(str[i] == closingBr){
          return i;
        }
      }
      return -1;
    }
    else{
      let openingBrcount = 1;
      let closingBrCount = 0;
      for(let i = 1; i < str.length; i++){
        if(str[i] == openingBr){
          openingBrcount++;
        }
        if(str[i] == closingBr){
          closingBrCount++;
        }
        if(closingBrCount == openingBrcount){
          return i;
        }
      }
      return -1;
    }
  }

  if(str == ""){
    return true;
  }

  if(containsSimilarBrackets(bracketsConfig)){
    bracketsConfig = bracketsConfig.map(x => x[0] == x[1] ? [x[0]] : x);
  }

  let closingBracket = findClosingBracket(str[0]);
  if(closingBracket == ""){
    return false;
  }

  let clBrPos = closingBracketPos(str[0], closingBracket, str);

  if(clBrPos == -1){
    return false;
  }
  else{
    if(clBrPos == str.length - 1){
      if(str.length == 2){
        return true;
      }
      else{
        let innerStr = str.substr(1, clBrPos - 1);
        return check(innerStr, bracketsConfig);
      }
    }
    else{
      let firstStrPart = str.substr(1, clBrPos - 1);
      let secondStrPart = str.substr(clBrPos + 1);
      return check(firstStrPart, bracketsConfig) && check(secondStrPart, bracketsConfig);
    }
  }
}
