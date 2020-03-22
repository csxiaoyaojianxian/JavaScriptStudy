/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-22 00:06:21
 * @Description: sunjianfeng@csxiaoyao.com
 */
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { getData } from './data.js';

/**
 * XOR 异或(非线性)逻辑回归
 * 分割为四个象限
 */
window.onload = async () => {
    // 1. 准备训练数据
    const data = getData(400);
    // 散点图
    tfvis.render.scatterplot(
        { name: 'XOR 训练数据' },
        {
            values: [
                data.filter(p => p.label === 1),
                data.filter(p => p.label === 0),
            ]
        }
    );
    // 2. 初始化神经网络
    const model = tf.sequential();

    // 3. 添加全连接层
    // 3.1 隐藏层，核心
    model.add(tf.layers.dense({
        units: 4, // 神经元个数，比如此案例，4个象限
        inputShape: [2], // 输入特征，坐标 x y，inputShape为2
        // 激活函数 relu 让神经网络拥有非线性拟合能力，这是复杂神经网络拟合的核心
        // 如果不加这个激活函数，结果只能为线性，不能得到非线性的结果
        activation: 'relu'
    }));
    // 3.2 输出层
    model.add(tf.layers.dense({
        units: 1, // 神经元个数，最终输出的是一个概率值
        // inputShape: [4], // 不需要设置，因为上层的 units 已经确定了
        activation: 'sigmoid' // 选 sigmoid 输出 0-1 之间的值
    }));
    // 3.3 设置损失函数和优化器
    model.compile({
        loss: tf.losses.logLoss, // 损失函数，log损失，本质也是逻辑回归
        optimizer: tf.train.adam(0.1) // 优化器，adam，初始化学习速率0.1
    });

    // 4. 准备训练数据
    const inputs = tf.tensor(data.map(p => [p.x, p.y]));
    const labels = tf.tensor(data.map(p => p.label));

    // 5. 训练
    await model.fit(inputs, labels, {
        epochs: 10, // 10轮
        callbacks: tfvis.show.fitCallbacks(
            { name: '训练效果' },
            ['loss']
        )
    });

    window.predict = (form) => {
        const pred = model.predict(tf.tensor([[form.x.value * 1, form.y.value * 1]]));
        alert(`预测结果：${pred.dataSync()[0]}`);
    };
};