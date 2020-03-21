export function getData(numSamples) {
    let points = [];
  
    function genGauss(cx, cy, label) {
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
   * Samples from a normal distribution. Uses the seedrandom library as the
   * random generator.
   *
   * @param mean The mean. Default is 0.
   * @param variance The variance. Default is 1.
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