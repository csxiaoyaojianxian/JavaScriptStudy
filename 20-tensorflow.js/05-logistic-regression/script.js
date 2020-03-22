/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-22 16:24:51
 * @Description: sunjianfeng@csxiaoyao.com
 */
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';  
import { getData } from './data.js';

/**
 * 逻辑回归
 * 解决分类问题，得到的是概率
 */
window.onload = async () => {
    // 1. 准备训练数据
    const data = getData(400);
    console.log(data) // [{x,y,label}]
    
    // 散点图
    tfvis.render.scatterplot(
        { name: '逻辑回归训练数据' },
        {
            values: [
                data.filter(p => p.label === 1),
                data.filter(p => p.label === 0),
            ]
        }
    );
    
    // 2. 初始化神经网络模型
    const model = tf.sequential();
    // 添加层，dense： y=ax+b
    model.add(tf.layers.dense({
        units: 1, // 输出值为一个概率值，1个神经元即可
        inputShape: [2], // 坐标 x,y 两个值，特征数量为2
        activation: 'sigmoid' // 设置激活函数 sigmoid 0-1，(防止输入超过100%，对过大过小值收敛，保证数据在 0 - 1 之间)
    }));
    // 设置损失函数和优化器
    model.compile({
        loss: tf.losses.logLoss, // 损失函数，log损失，用于逻辑回归问题
        optimizer: tf.train.adam(0.1) // adam自动调节学习速率，初始化学习速率0.1
    });

    // 3. 训练数据转tensor
    const inputs = tf.tensor(data.map(p => [p.x, p.y]));
    const labels = tf.tensor(data.map(p => p.label));

    // 4. 训练
    await model.fit(inputs, labels, {
        batchSize: 40, // 一批40个
        epochs: 20, // 20轮
        callbacks: tfvis.show.fitCallbacks(
            { name: '训练效果' },
            ['loss']
        )
    });

    // 5. 重复利用模型进行预测
    window.predict = (form) => {
        // [x, y]
        const pred = model.predict(tf.tensor([[form.x.value * 1, form.y.value * 1]])); // * 1 转换为数字
        alert(`预测结果：${pred.dataSync()[0]}`);
    };
};
