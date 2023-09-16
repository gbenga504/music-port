export const convertCamelCaseToCapitalize = (value: string): string => {
  return (
    value
      // insert a space before all caps
      .replaceAll(/([A-Z])/g, " $1")
      // uppercase the first character
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
  );
};
