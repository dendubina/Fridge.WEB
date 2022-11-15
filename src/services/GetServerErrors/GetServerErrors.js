export const GetServerErrors = (errorsArr) => {
  let result = [];

  for (let key in errorsArr) {
    errorsArr[key].forEach((item) => {
      result.push(item);
    });
  }

  return result;
};
