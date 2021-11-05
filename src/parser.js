const parseBoolean = (val) => {
  return val === "true" ? true : val === "false" ? false : NaN;
};

const extractPrimitiveFromStr = (value) => {
  const primitiveParsers = [parseFloat, parseBoolean];
  for (const parser of primitiveParsers) {
    const res = parser(value);
    if (!isNaN(res)) {
      value = res;
      break;
    }
  }
  return value;
};

const transformKeyValue = (keyValue) => {
  let [path, value] = keyValue.split("=");
  if (!value) return [null, null];
  if (value[0] === '"' && value[value.length - 1] === '"') {
    value = value.split('"')[1];
  } else {
    value = extractPrimitiveFromStr(value);
  }
  return [path.split("."), value];
};

const setNestedValue = (obj, path, value) => {
  if (path.length === 1) {
    obj[path] = value;
    return;
  }
  const prop = obj[path[0]];
  if (!prop) obj[path[0]] = {};
  return setNestedValue(obj[path[0]], path.slice(1), value);
};

const parseQuery = (url) => {
  const urlParts = url.split("?");
  if (urlParts.length > 2) throw Error("Invalid url structure");
  const queryStr = urlParts[1];
  if (!queryStr) return null;

  const keyValues = queryStr.split("&");
  const query = {};
  for (const kv of keyValues) {
    const [path, value] = transformKeyValue(kv);
    if (value !== null) setNestedValue(query, path, value);
  }
  return query;
};

module.exports = parseQuery;
