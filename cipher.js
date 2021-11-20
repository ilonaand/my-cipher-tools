const encode = (char, shift) => {
  let ch = char;
  const eng = 26;
  ch = ch + (shift % eng);
  if ( ch > 90 ) ch = 65 + (ch - 90) - 1;
  return ch;
}

const decode = (char, shift) => {
  let ch = char;
  const eng = 26;
  ch = ch - (shift % eng);
  if (ch < 65) ch = 90 - (65 - ch) + 1;
  return ch;
}

const aCode = (char) => {
  let ch = char;
  return ch <= 77 ? 78 + (77 - ch) : 77 - (ch - 78);
}

/*  shift - сдвиг, Atbash (shift = -1), ROT-8 (shift = 8), CEASAR (shift = 1) */
/* direction- направление, encode (direction = 1)\ decode (direction = 0) */

export const cipherFun = (str, shift = 1, direction = 1) => {
  let newStr = '';
  for (let char of str) {
    const upper = char.toUpperCase() === char ? true : false;
    let ch = char.toUpperCase().charCodeAt(0);
    if (ch >= 65 && ch <= 90) {
      shift > 0 ?
        ch = direction === 1 ? encode(ch, shift) : decode(ch, shift)
        :
        ch = aCode(ch);
    }
    ch = String.fromCharCode(ch);
    newStr = newStr.concat(upper ? ch : ch.toLowerCase());
  }
  return newStr;
}