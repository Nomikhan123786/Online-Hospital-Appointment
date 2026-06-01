const cache = {};

export const setCache = (key, data) => {
  cache[key] = {
    data,
    time: Date.now()
  };
};

export const getCache = (key) => {
  if (!cache[key]) return null;

  const isExpired = Date.now() - cache[key].time > 10000;

  return isExpired ? null : cache[key].data;
};