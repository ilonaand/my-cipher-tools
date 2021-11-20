import { Transform } from 'stream';  
import { cipherFun } from './cipher.js'

class myTransform extends Transform {
  constructor(options = { shift: 1, direction: 1 }) {
    super(options);
    this.direction = options.direction;
    this.shift = options.shift
  }
  _transform(chunk, enc, callback){
    const result = cipherFun(chunk.toString(), this.shift, this.direction);
    this.push(result)
    callback();
  }
}

export { myTransform }