export const stringsToJson = (data: object) => {
  return JSON.stringify(data, null, 2);
};

export const toCapitalize = ([first = '', ...rest]) => {
  return first.toUpperCase() + rest.join('').toLowerCase();
};

export const consoleLogStringsToJson = (data: object) => {
  console.log(stringsToJson(data));
};
