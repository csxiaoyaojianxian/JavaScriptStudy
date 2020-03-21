/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-21 12:57:36
 * @Description: sunjianfeng@csxiaoyao.com
 */
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis'; // 可视化库

window.onload = async () => {
    // 输入
    const xs = [1, 2, 3, 4];
    // 输出
    const ys = [1, 3, 5, 7];

    // 数据可视化  https://js.tensorflow.org/api_vis/latest/#render.scatterplot
    /*
    // 散点图
    tfvis.render.scatterplot(
        { name: '线性回归训练集' },
        { values: xs.map((x, i) => ({ x, y: ys[i] })) },
        { xAxisDomain: [0, 5], yAxisDomain: [0, 8] }
    ); */
    
    /**
     * 1. 初始化神经网络模型
     */
    // 1.1 创造连续的模型，下一层的输入是上一层的输出
    const model = tf.sequential();
    // 1.2 添加层，1个神经元(根据经验预测)、1个特征(根据输入数据确定)，【 比如（1,2,3）为1个特征，（[1,2],[3,4],[5,6]）为2个特征 】
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    // 1.3 设置损失函数 loss，用于计算结果数据的误差，线性回归使用均方误差(MSE)作为损失函数即可
    // 1.4 设置优化器 optimizer，用于确定训练过程中数据的改进(方向和幅度)[梯度]，可以粗略理解为斜率，随机梯度下降(SGD)
    //     学习速率，可以粗略理解为步长，不适宜过大或过小
    model.compile({ loss: tf.losses.meanSquaredError, optimizer: tf.train.sgd(0.1) });
    
    /**
     * 2. 训练
     */
    // 2.1 训练数据转 tensor
    const inputs = tf.tensor(xs);
    const labels = tf.tensor(ys);
    // 2.2 异步拟合，设置超参数(暴露的可以调节的参数)
    await model.fit(inputs, labels, {
        batchSize: 4, // 每次模型使用的样本量，用于数据量很大时候随机抽样，此处可以设置为4个样本（全部）
        epochs: 100, // 训练次数
        callbacks: tfvis.show.fitCallbacks( // 可视化
            { name: '训练过程' },
            ['loss'] // 度量
        )
    });

    /**
     * 3. 验证预测
     */
    // 3.1 验证数据转 tensor，并进行预测
    const output = model.predict(tf.tensor([5]));
    // 3.2 输出结果转数字，output.dataSync()
    alert(`如果 x 为 5，那么预测 y 为 ${output.dataSync()[0]}`);
};