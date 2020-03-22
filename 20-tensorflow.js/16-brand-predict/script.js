/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-22 21:17:22
 * @Description: sunjianfeng@csxiaoyao.com
 */
import * as tf from '@tensorflow/tfjs';
import { img2x, file2img } from './utils';

const MODEL_PATH = 'http://127.0.0.1:8080';
const BRAND_CLASSES = ['android', 'apple', 'windows'];

/**
 * 工程应用
 * 模型转换，参考 README.md
 * 加载模型预测
 */
window.onload = async () => {
    const mobilenet = await tf.loadLayersModel(MODEL_PATH + '/mobilenet/web_model/model.json');
    mobilenet.summary();
    const layer = mobilenet.getLayer('conv_pw_13_relu');
    const truncatedMobilenet = tf.model({
        inputs: mobilenet.inputs,
        outputs: layer.output
    });

    const model = await tf.loadLayersModel(MODEL_PATH + '/brand/web_model/model.json');

    window.predict = async (file) => {
        const img = await file2img(file);
        document.body.appendChild(img);
        const pred = tf.tidy(() => {
            const x = img2x(img);
            const input = truncatedMobilenet.predict(x);
            return model.predict(input);
        });

        const index = pred.argMax(1).dataSync()[0];
        setTimeout(() => {
            alert(`预测结果：${BRAND_CLASSES[index]}`);
        }, 0);
    };
};