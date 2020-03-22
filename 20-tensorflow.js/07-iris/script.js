/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-22 00:25:23
 * @Description: sunjianfeng@csxiaoyao.com
 */
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { getIrisData, IRIS_CLASSES } from './data';

/**
 * IRIS 训练集和验证集
 * 多分类问题
 * 鸢尾花案例，softmax 概率和为1
 */
window.onload = async () => {
    // 15%数据作为验证集 xTrain训练集输入特征，yTrain训练集标签(输出结果)，xTest验证集输入，yTest验证集输出
    const [xTrain, yTrain, xTest, yTest] = getIrisData(0.15);
    // xTrain.print(); // [[x,x,x,x],[...],...] 花萼花瓣长度宽度
    // yTrain.print(); // [[0,0,1],[1,0,0],...] 三种花的概率
    // xTest.print(); // 同 xTrain
    // yTest.print(); // 同 yTrain
    // console.log(IRIS_CLASSES);

    // 1. 初始化神经网络模型
    const model = tf.sequential();

    // 2. 添加层
    // 隐藏层
    model.add(tf.layers.dense({
        units: 10, // 神经元个数，本案例比较复杂
        inputShape: [xTrain.shape[1]], // 特征，花萼花瓣长宽，4，xTrain.shape[1]==4
        activation: 'sigmoid' // 激活函数 sigmoid 0-1
    }));
    // !!! softmax
    model.add(tf.layers.dense({
        units: 3, // 输出为3个概率值，设为3
        activation: 'softmax' // 三个输出值和为1 【核心】
    }));

    // 3. 设置交叉熵损失函数、优化器、准确度
    // 交叉熵损失函数是log对数损失函数的多分类版本
    model.compile({
        loss: 'categoricalCrossentropy', // 交叉熵损失函数
        optimizer: tf.train.adam(0.1), // 优化器
        metrics: ['accuracy'] // 准确度
    });

    // 4. 训练
    await model.fit(xTrain, yTrain, {
        epochs: 100, // 轮
        validationData: [xTest, yTest], // 验证集
        callbacks: tfvis.show.fitCallbacks( // 可视化
            { name: '训练效果' },
            ['loss', 'val_loss', 'acc', 'val_acc'], // 损失、验证集损失、准确度、验证集准确度
            { callbacks: ['onEpochEnd'] } // 确定界面，减少训练过程中的默认界面
        )
    });

    // 5. 预测
    window.predict = (form) => {
        const input = tf.tensor([[
            form.a.value * 1,
            form.b.value * 1,
            form.c.value * 1,
            form.d.value * 1,
        ]]);
        const pred = model.predict(input);
        // pred.argMax(1) 输出第二维的3个概率值中的最大值（从0开始）[[x,x,x],[],...]
        alert(`预测结果：${IRIS_CLASSES[pred.argMax(1).dataSync(0)]}`);
    };
};