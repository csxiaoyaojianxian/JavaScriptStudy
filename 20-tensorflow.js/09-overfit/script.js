/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-22 02:15:40
 * @Description: sunjianfeng@csxiaoyao.com
 */
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { getData } from './data';

/**
 * 过拟合
 * 模型过于复杂，表现为训练集loss降低，但是验证集loss升高
 * 解决：
 *   1. 早停法，直接观察手动停止
 *   2. 权重衰减，把过度复杂的模型权重衰减，kernelRegularizer
 *   3. 丢弃法：随机丢弃隐藏层神经元权重，dropout
 */
window.onload = async () => {

    // 获取带噪音数据，[[x,y,label],[]] label=0,1
    const data = getData(200, 2);

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

    const model = tf.sequential();
    model.add(tf.layers.dense({
        units: 10,
        inputShape: [2],
        activation: "tanh", // 此处用 tanh，也可以用其他的，非线性
        // 【 权重衰减 】 设置l2
        kernelRegularizer: tf.regularizers.l2({ l2: 1 })
    }));

    // 【 丢弃法 】 添加丢弃层，设置丢弃率，随机丢弃一部分神经元权重
    model.add(tf.layers.dropout({ rate: 0.9 }));

    model.add(tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
    }));
    model.compile({
        loss: tf.losses.logLoss,
        optimizer: tf.train.adam(0.1)
    });

    const inputs = tf.tensor(data.map(p => [p.x, p.y]));
    const labels = tf.tensor(data.map(p => p.label));

    await model.fit(inputs, labels, {
        validationSplit: 0.2,
        epochs: 200,
        callbacks: tfvis.show.fitCallbacks(
            { name: '训练效果' },
            ['loss', 'val_loss'],
            { callbacks: ['onEpochEnd'] }
        )
    });
};