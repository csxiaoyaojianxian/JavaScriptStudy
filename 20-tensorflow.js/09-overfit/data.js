/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-22 01:36:20
 * @Description: sunjianfeng@csxiaoyao.com
 */

/**
 * @param {*} numSamples 生成样本数量
 * @param {*} variance 噪音级别
 */
export function getData(numSamples, variance) {
    let points = [];
  
    function genGauss(cx, cy, label) {
      for (let i = 0; i < numSamples / 2; i++) {
        let x = normalRandom(cx, variance);
        let y = normalRandom(cy, variance);
        points.push({ x, y, label });
      }
    }
  
    genGauss(2, 2, 1);
    genGauss(-2, -2, 0);
    return points;
  }
  
  /**
   * Samples from a normal distribution. Uses the seedrandom library as the
   * random generator.
   *
   * @param mean The mean. Default is 0.
   * @param variance The variance. Default is 1. 方差，噪音，越大噪音越多
   */
  function normalRandom(mean = 0, variance = 1) {
    let v1, v2, s;
    do {
      v1 = 2 * Math.random() - 1;
      v2 = 2 * Math.random() - 1;
      s = v1 * v1 + v2 * v2;
    } while (s > 1);
  
    let result = Math.sqrt(-2 * Math.log(s) / s) * v1;
    return mean + Math.sqrt(variance) * result;
  }