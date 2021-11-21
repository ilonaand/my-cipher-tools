const { exit } = process;

/* check flag -c --config */
const checkC = (flagArray) => {
  if ((flagArray.length === 0) || flagArray.filter(x => (x ===  '-c' || x === '--config')).length === 0) 
    return 'Добавьте как минимум флаг -c ';
  return 0;
}

/* check repeat flags  */
function checkRepeat(flagArray, options) {
  if (flagArray.filter(x => (x === options[0] || x === options[1])).length > 1)
    return `флаги ${options} повторяются `;
  return 0;
}

const transaformToArray = (flagArray, options) => {
  const i = flagArray.indexOf(options[0]) >= 0 
    ? flagArray.indexOf(options[0]) 
    : flagArray.indexOf(options[1]) >= 0 
    ? flagArray.indexOf(options[1])
    : -1;
  if (i < 0) return 0;
  let arr = flagArray.slice(i, i + 2);
  let begin = (arr[0].slice(1, 2) === '-') ? 2 : 1;
  return {[arr[0].slice(begin, begin + 1)]: arr[1]};
}

const unFlat = (flagArray, allowFlags) => {
  let err = checkC(flagArray);
  if (err) {
    console.error(err);
    exit(1);
  }
  for (let i = 0; i < 3; i++) {
    const err = checkRepeat(flagArray, allowFlags.slice((i*2), (i*2) + 2));
    if (err !== 0) {
      console.error(err);
      exit(1);
    }
  }
  let obj = {};
  for (let i = 0; i < 3; i++) {
    let item = transaformToArray(flagArray, allowFlags.slice((i*2), (i*2) + 2));
    if (item !== 0) {
      obj = Object.assign(obj, item);
    }
  }
  return obj;
}

const validateConfig = (config, allowConfig) => {
  const arr = config.split('-');
  for (let i = 0; i < arr.length; i++) {
    if (allowConfig.indexOf(arr[i]) < 0) {
      console.error('config is not valid');
      exit(1);
    }
  }
  return arr;
}

export { validateConfig, unFlat };