/**
 * $ yarn add @tensorflow/tfjs
 * $ npm install @tensorflow/tfjs
 */

import * as tf from '@tensorflow/tfjs';

// Define a model for linear regression. 定义模型：线性回归模型
const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

// Prepare the model for training: Specify the loss and the optimizer. 定义模型损失函数和梯度下降算法
model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

// Generate some synthetic data for training. 准备学习数据
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// Train the model using the data. 模型学习
model.fit(xs, ys).then(() => {
    // Use the model to do inference on a data point the model hasn't seen before:  使用训练完成的模型进行预测
    model.predict(tf.tensor2d([5], [1, 1])).print();
});