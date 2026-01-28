type Temp = {
  email?: string;
  password?: string;
};

let temp: Temp = {};

export const setStepOne = (data: Temp) => {
  temp = { ...temp, ...data };
};

export const getTemp = () => temp;

export const clearTemp = () => {
  temp = {};
};

export default { setStepOne, getTemp, clearTemp };
