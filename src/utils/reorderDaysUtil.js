export const reorderDaysUtil = () => {
  const day = new Date().getDay() + 1;
  const arrDays = [1, 2, 3, 4, 5, 6, 7];
  const index = arrDays.indexOf(day);
  const len = arrDays.length;
  const arr1 = arrDays.slice(0, index);
  const arr2 = arrDays.slice(index, len);
  return [...arr2, ...arr1];
};

export const makeCaseSql = () => {
  const arrDays = reorderDaysUtil();
  return arrDays
    .map(
      (day, index) =>
        `CASE WHEN a.id_day_of_week = ${day} THEN ${index + 1} ELSE 7 END`,
    )
    .join(",");
};
