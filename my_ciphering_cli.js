import { unFlat, validateConfig } from './src/validate.js';
import  process, { stdin, stdout } from 'process';
import { pipeline } from  'stream';
import { myTransform } from './src/transformStream.js';
import { myReadStream } from './src/readableStream.js';
import { myWriteStream } from './src/writableStream.js';
import path from 'path';
const __dirname = path.resolve();

const flagArray = process.argv.slice(2);
const allowFlags = [ '-c', '--config', '-i', '--input', '-o', '--output' ];
const allowConfig = [ 'C0', 'C1', 'R0', 'R1', 'A'];
const obj = unFlat(flagArray, allowFlags);
const config = obj['c'];
const arrConfig = validateConfig(config, allowConfig);
const configMap = {
    'C0': () => new myTransform({ shift: 1, direction: 0}),
    'C1': () => new myTransform({ shift: 1, direction: 1}),
    'R0': () => new myTransform({ shift: 8, direction: 0}),
    'R1': () => new myTransform({ shift: 8, direction: 1}),
    'A': () => new myTransform({ shift: -1, direction: 0}),
  };
//console.log(flagArray, obj, arrConfig); 
const read = obj["i"] ? new myReadStream(path.join(__dirname, obj["i"])) : stdin;
read.on("error", err => {
  console.error(err);
  process.exit(1);
});
  
const write = obj["o"] ? new myWriteStream(path.join(__dirname, obj["o"])) : stdout;
write.on("error", err => {
  console.error(err);
  process.exit(1);
});

const arrTransform = arrConfig.map((item) => configMap[item]()); 

try {
  pipeline(
    read,
    ... arrTransform,
    write,
    err => err
  );
} catch (e) {
  console.error(e);
  process.exit(1);
};

 