/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-21 12:54:08
 * @Description: sunjianfeng@csxiaoyao.com
 */
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

window.onload = async () => {
    /**
     * 归一化
     * 数据调整为 0 - 1 之间，避免某些数据影响过大，同时方便 tensorflow 处理
     */

    const heights = [150, 160, 170]; // 身高 cm
    const weights = [40, 50, 60]; // 体重 kg

    // 散点图
    /*
    tfvis.render.scatterplot(
        { name: '身高体重训练数据' },
        { values: heights.map((x, i) => ({ x, y: weights[i] })) },
        {
            xAxisDomain: [140, 180],
            yAxisDomain: [30, 70]
        }
    ); */

    // 1. 训练数据归一化  (减去最小值，除以最大最小值差值)
    const inputs = tf.tensor(heights).sub(150).div(20);
    const labels = tf.tensor(weights).sub(40).div(20);
    inputs.print();
    labels.print();
    
    // 2. 初始化神经网络模型，参考03线性回归
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ loss: tf.losses.meanSquaredError, optimizer: tf.train.sgd(0.1) });
    
    // 3. 训练，参考03线性回归
    await model.fit(inputs, labels, {
        batchSize: 3,
        epochs: 200,
        callbacks: tfvis.show.fitCallbacks(
            { name: '训练过程' },
            ['loss']
        )
    });

    // 4. 预测，输入数据归一化
    const output = model.predict(tf.tensor([180]).sub(150).div(20));
    
    // 5. 对结果数据反归一化
    alert(`如果身高为 180cm，那么预测体重为 ${output.mul(20).add(40).dataSync()[0]}kg`);
};