/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-22 16:17:47
 * @Description: sunjianfeng@csxiaoyao.com
 */
import * as tf from '@tensorflow/tfjs';
import { IMAGENET_CLASSES } from './imagenet_classes';
import { file2img } from './utils';

/**
 * 【 预训练模型 】
 * 已经事先训练好的模型，无需训练即可预测
 * 在 tensorflow.js 中调用web格式的模型文件
 * 
 * 【 MobileNet模型 】
 * 图像分类模型
 * 卷积神经网络模型的一种，轻量、速度快，但是准确性一般
 * 
 * 【 文件说明 】
 * 1. 模型在 /data/mobilenet/web_model/ 下
 * 2. 模拟能够识别的1000种类别 ./imagenet_classes
 * 
 * 【 启动静态资源服务器 】
 * $ hs data --cors
 */

// 模型地址
const MOBILENET_MODEL_PATH = 'http://127.0.0.1:8080/mobilenet/web_model/model.json';

window.onload = async () => {
    // 加载模型文件
    const model = await tf.loadLayersModel(MOBILENET_MODEL_PATH);
    // console.log(model);

    window.predict = async (file) => {
        // file 转 img
        const img = await file2img(file);
        document.body.appendChild(img);
        // img 转 tf 能处理的数据格式
        const pred = tf.tidy(() => {
            // img 转 tensor
            const input = tf.browser.fromPixels(img)
                .toFloat()
                // 归一化，和mnist不同，mobilenet需要归一化到 -1 ～ 1 之间
                .sub(255 / 2) // 处理为 -127.5 ～ 127.5
                .div(255 / 2) // 处理为 -1 ～ 1
                .reshape([1, 224, 224, 3]); // 放到 tensor 数组，1个图片，224 x 224，rgb彩色
            return model.predict(input);
        });
        // 获取预测值的索引
        const index = pred.argMax(1).dataSync()[0];
        setTimeout(() => {
            alert(`预测结果：${IMAGENET_CLASSES[index]}`);
        }, 0);
    };
};