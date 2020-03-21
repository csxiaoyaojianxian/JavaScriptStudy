/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-21 08:51:39
 * @Description: sunjianfeng@csxiaoyao.com
 */
import * as tf from '@tensorflow/tfjs';

// tensor 张量
// 存储神经元，使用 tensor

/**
 * 传统 for 循环方式
 */
// 输入，如五官、身材、家境等
const input = [1, 2, 3, 4];
// 神经元权重
const w = [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6], [4, 5, 6, 7]];
// 输出
const output = [0, 0, 0, 0];
// 循环神经元
for (let i = 0; i < w.length; i++) {
    for (let j = 0; j < input.length; j++) {
        output[i] += input[j] * w[i][j];
    }
}
// 每个神经元等值
console.log(output); // [30, 40, 50, 60]

/**
 * tensor方式
 * 语法简洁，GPU加速
 */
tf.tensor(w).dot(tf.tensor(input)).print();
