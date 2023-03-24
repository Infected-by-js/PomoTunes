const padZero = (v: number) => String(v).padStart(2, '0');

export const secondsToTime = (sec: number) => {
  const SEC_IN_HOUR = 3600;
  const hours = Math.floor(Math.round(sec) / SEC_IN_HOUR);
  const minutes = Math.floor((Math.round(sec) % SEC_IN_HOUR) / 60);
  const seconds = Math.ceil((Math.round(sec) % SEC_IN_HOUR) % 60);

  return {
    HH: padZero(hours),
    mm: padZero(minutes),
    ss: padZero(seconds),
  };
};

export const secondsToMinutes = (sec: number) => {
  const minutes = Math.floor(sec / 60);
  const seconds = sec - minutes * 60;

  return {
    mm: padZero(minutes),
    ss: padZero(seconds),
  };
};
