export function seperateNumber(number: number) {
  let str = number.toString();
  while (str.length % 3 !== 0) {
    str = "0" + str;
  }
  const length = str.length;
  const result = [];
  for (let i = 0; i < length; i += 3) {
    result.push(str.slice(i, i + 3));
  }
  let resultString = result.join(",");
  while (resultString[0] === "0") {
    resultString = resultString.slice(1);
  }
  return resultString;
}
