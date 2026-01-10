type Temp = {
  email?: string;
  password?: string;
};

let temp: Temp = {};

export function setStepOne(data: Temp) {
  temp = { ...temp, ...data };
}

export function getTemp() {
  return temp;
}

export function clearTemp() {
  temp = {};
}

export default { setStepOne, getTemp, clearTemp };
