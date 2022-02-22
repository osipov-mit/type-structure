export function splitByCommas(str: string) {
  let counter = 0;
  let result = [];
  let lastTypeIndex = 0;
  try {
    Array.from(str).forEach((char, index) => {
      if (char === ',' && counter === 0) {
        result.push(str.slice(lastTypeIndex, index).trim());
        lastTypeIndex = index + 1;
      }
      (char === '<' || char === '(') && counter++;
      (char === '>' || char === ')') && counter--;
    });
    result.push(str.slice(lastTypeIndex).trim());
  } catch (_) {}
  return result;
}

export function isJSON(data: any) {
  try {
    JSON.parse(data);
  } catch (error) {
    try {
      if (JSON.stringify(data)[0] !== '{') {
        return false;
      }
    } catch (error) {
      return false;
    }
    return true;
  }
  return true;
}

export function toJSON(data: any) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
}
