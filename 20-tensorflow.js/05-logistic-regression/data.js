/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-21 18:34:40
 * @Description: sunjianfeng@csxiaoyao.com
 */
export function getData(numSamples) {
  let points = [];
  // 生成高斯分布(正态分布)的点
  function genGauss(cx, cy, label) {
    // numSamples 分成两拨
    for (let i = 0; i < numSamples / 2; i++) {
      let x = normalRandom(cx);
      let y = normalRandom(cy);
      points.push({ x, y, label });
    }
  }
  genGauss(2, 2, 1);
  genGauss(-2, -2, 0);
  return points;
}

/**
 * Box-Muller transform 算法
 * @param mean 正态分布中心值
 * @param variance 密集程度
 */
function normalRandom(mean = 0, variance = 1) {
  let v1, v2, s;
  // Math.random() 0-1均匀分布
  // 原正态分布公式使用了 sin cos，性能较低，此处进行了优化
  do {
    v1 = 2 * Math.random() - 1;
    v2 = 2 * Math.random() - 1;
    s = v1 * v1 + v2 * v2;
  } while (s > 1);
  let result = Math.sqrt(-2 * Math.log(s) / s) * v1;
  return mean + Math.sqrt(variance) * result;
}