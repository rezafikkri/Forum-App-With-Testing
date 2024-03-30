import crypto from 'node:crypto';

const algorithm = 'aes-192-cbc'; // algorithm to use
const key = crypto.scryptSync(process.env.CRYPT_SECRET, 'salt', 24);

export function encrypt(data) {
  const cipher = crypto.createCipheriv(algorithm, key, process.env.CRYPT_IV);
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex'); // encrypted text
}

export function decrypt(data) {
  const decipher = crypto.createDecipheriv(algorithm, key, process.env.CRYPT_IV);
  return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8'); // deciphered text
}
