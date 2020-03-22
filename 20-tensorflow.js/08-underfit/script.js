/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-22 02:01:00
 * @Description: sunjianfeng@csxiaoyao.com
 */
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { getData } from '../06-xor/data';

/**
 * 欠拟合
 * 表现为损失过高，原因为模型过于简单，不能拟合，或者训练时间不足等
 * 本案例使用线性回归拟合XOR问题
 */
window.onload = async () => {

    const data = getData(200);

    // 散点图
    tfvis.render.scatterplot(
        { name: '训练数据' },
        {
            values: [
                data.filter(p => p.label === 1),
                data.filter(p => p.label === 0),
            ]
        }
    );
    
    // 初始化模型
    const model = tf.sequential();
    model.add(tf.layers.dense({
        units: 1, // 1个神经元
        inputShape: [2],
        activation: "sigmoid"
    }));
    model.compile({
        loss: tf.losses.logLoss, // log损失函数
        optimizer: tf.train.adam(0.1) // 优化器 adam
    });

    // 转 tensor
    const inputs = tf.tensor(data.map(p => [p.x, p.y]));
    const labels = tf.tensor(data.map(p => p.label));

    // 训练
    await model.fit(inputs, labels, {
        validationSplit: 0.2, // 20%作为验证集
        epochs: 200, // 训练回合
        callbacks: tfvis.show.fitCallbacks(
            { name: '训练效果' },
            ['loss', 'val_loss'], // 训练损失 + 验证损失
            { callbacks: ['onEpochEnd'] }
        )
    });
};