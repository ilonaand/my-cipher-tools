const flagArray = process.argv.slice(2);

const allowFlags = [['-c', '--config'], ['-i', '--input'], ['-o', '--output' ]];

/* check flag -c --config */
const checkC = (flagArray) => {
  if (!flagArray.includes('-c') && !flagArray.includes('--config'))
    return 'Добавьте как минимум флаг -c ';
  return 0;
}


/* check repeat flags  */
function checkRepeat(flagArray, allowFlags) {
  for  (let i = 0; i < 3; i++) {
    if (flagArray.filter(x => (x === allowFlags[i][0] || x === allowFlags[i][1])).length > 1)
      return `флаги  ${allowFlags[i]} повторяются `;
  }
  return 0;
}


// console.log(checkC(flagArray)); 
// console.log(checkRepeat(flagArray, allowFlags));

const transaformToArray = (flagArray, options) => {
  let i = flagArray.indexOf(options[0]);
  if (i < 0) {
    i = flagArray.indexOf(options[1]);  
  }
  // const i = flagArray.indexOf(options[0]) >= 0 
  //   ? flagArray.indexOf(options[0]) 
  //   : flagArray.indexOf(options[1]) >= 0 
  //   ? flagArray.indexOf(options[1])
  //   : -1;
  if (i < 0) return 0;
  const arr = flagArray.slice(i, i + 2); 
  return { [arr[0].replaceAll('-', '')[0]] : arr[1]}
  // let begin = (arr[0].slice(1, 2) === '-') ? 2 : 1;
  // return {[arr[0].slice(begin, begin + 1)]: arr[1]};
}

const unFlat = (flagArray, allowFlags) => {
  let err = checkC(flagArray);
  if (err) {
    console.error(err);
    exit(1);
  }
 
  err = checkRepeat(flagArray, allowFlags);
  if (err !== 0) {
    console.error(err);
    exit(1);
  }
  let obj = {};
  for (let i = 0; i < 3; i++) {
    let item = transaformToArray(flagArray, allowFlags[i]);
    if (item !== 0) {
      obj = Object.assign(obj, item);
    }
  }
  return obj;
}

//"C1-C1-R0-A"
const allowConfig = [ 'C0', 'C1', 'R0', 'R1', 'A'];
const validateConfig = (config, allowConfig) => {
  const arr = config.split('-');
  for (let i = 0; i < arr.length; i++) {
    if (!allowConfig.includes(arr[i])) {
      console.error('config is not valid');
      exit(1);
    }
  }
  return arr;
}

//console.log(validateConfig ('C1-C1-R0-A-', allowConfig));

export { unFlat,  validateConfig }
