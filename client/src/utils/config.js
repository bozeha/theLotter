const defaultConfig = {
  numberInPage: 5,
};

const getConfig = (val) => {
  return process.env[val] || defaultConfig[val];
};
export default getConfig;
