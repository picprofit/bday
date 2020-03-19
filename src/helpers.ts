const calculateAge = (birthday: Date): number => {
  const ageInMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageInMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export { calculateAge };

const getRandom = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export { getRandom };

const randomId = (): string => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + s4() + s4() + s4() + s4();
};

export { randomId };
