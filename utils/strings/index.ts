export const stringsToJson = (data: object) => {
  return JSON.stringify(data, null, 2);
};

export const toCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const consoleLogStringsToJson = (data: object) => {
  console.log(stringsToJson(data));
};
