/*
 * @Author: csxiaoyao 
 * @Date: 2018-04-15 19:20:15 
 * @Last Modified by: csxiaoyao
 * @Last Modified time: 2018-04-15 19:54:03
 */
// Nodejs用C/C++实现加密算法后，通过cypto这个模块暴露为JavaScript接口，运行速度快
const crypto = require('crypto');

/**
 * MD5和SHA1
 */
const hash = crypto.createHash('md5'); // 如果要计算SHA1，'md5' => 'sha1'，还可以使用更安全的 'sha256' 和 'sha512'
// 可任意多次调用update(data, code):  data为String或buffer，code为utf8(默认)、ascii、binary
hash.update('Hello, world!');
hash.update('Hello, nodejs!');
// digest方法输出摘要内容，使用一个可选参数，用于指定输出摘要的编码格式，可指定的参数值为：hex、binary、base64，如果省略该参数，将返回一个Buffer对象 
console.log(hash.digest('hex')); // 7e1977739c...

/**
 * Hmac
 */
// Hmac也是一种哈希算法，利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥，可以把Hmac理解为用随机数“增强”的哈希算法
const hmac = crypto.createHmac('sha256', 'secret-key');
hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');
console.log(hmac.digest('hex')); // 80f7e22570...

/**
 * AES
 */
// AES是一种常用的对称加密算法，加解密都用同一个密钥。crypto模块提供了AES支持，但需要自己封装好函数，便于使用
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);

/**
 * Diffie - Hellman
 */
// DH算法是一种密钥交换协议，它可以让双方在不泄漏密钥的情况下协商出一个密钥，DH算法基于数学原理
// 比如小明和小红想要协商一个密钥：
// 1. 小明先选一个素数和一个底数，例如，素数p = 23，底数g = 5（底数可以任选），再选择一个秘密整数a = 6，计算A = g ^ a mod p = 8，然后大声告诉小红：p = 23，g = 5，A = 8；
// 2. 小红收到小明发来的p，g，A后，也选一个秘密整数b = 15，然后计算B = g ^ b mod p = 19，并大声告诉小明：B = 19；
// 3. 小明自己计算出s = B ^ a mod p = 2
// 4. 小红自己计算出s = A ^ b mod p = 2
// 5. 最终协商的密钥s为2
// 在这个过程中，密钥2并不是小明告诉小红的，也不是小红告诉小明的，而是双方协商计算出来的，第三方只能知道p = 23，g = 5，A = 8，B = 19，由于不知道双方选的秘密整数a = 6和b = 15，因此无法计算出密钥2

// xiaoming's keys:
var ming = crypto.createDiffieHellman(512);
var ming_keys = ming.generateKeys();

var prime = ming.getPrime();
var generator = ming.getGenerator();

console.log('Prime: ' + prime.toString('hex'));
console.log('Generator: ' + generator.toString('hex'));

// xiaohong's keys:
var hong = crypto.createDiffieHellman(prime, generator);
var hong_keys = hong.generateKeys();

// exchange and generate secret:
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);

// print secret:
console.log('Secret of Xiao Ming: ' + ming_secret.toString('hex'));
console.log('Secret of Xiao Hong: ' + hong_secret.toString('hex'));


