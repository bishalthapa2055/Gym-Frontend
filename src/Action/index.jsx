export const incNumber = (num) => {
  return {
    type: "INC",
    payload: num,
  };
};

export const decNumber = (num) => {
  return {
    type: "DEC",
    payload: num,
  };
};
