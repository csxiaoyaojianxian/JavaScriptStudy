/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-22 20:13:25
 * @Description: sunjianfeng@csxiaoyao.com
 */
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { getInputs } from './data';
import { img2x, file2img } from './utils';

/**
 * 【 迁移学习 】
 * 把已训练好的模型参数迁移到新的模型来帮助新模型训练
 * 深度学习模型参数多，从头训练成本高
 * 删除原始模型的最后一层，基于此截断模型的输出训练一个新的（通常相当浅的）模型
 * 本案例，在 mobilenet 基础上，最后输出 ['android', 'apple', 'windows'] 三选一
 * 模型的保存
 */
const MOBILENET_MODEL_PATH = 'http://127.0.0.1:8080/mobilenet/web_model/model.json';
const NUM_CLASSES = 3;
const BRAND_CLASSES = ['android', 'apple', 'windows'];

window.onload = async () => {
    // 1. 获取输入数据并在 visor 面板中展示
    const { inputs, labels } = await getInputs();
    const surface = tfvis.visor().surface({ name: '输入示例', styles: { height: 250 } });
    inputs.forEach(img => {
        surface.drawArea.appendChild(img);
    });

    // 加载mobilenet 模型并截断  构建双层神经网络  截断模型作为输入，双层神经网络作为输出
    // 2. 模型迁移
    // 2.1 加载 mobilenet 模型， tfjs_layers_model 格式
    const mobilenet = await tf.loadLayersModel(MOBILENET_MODEL_PATH);
    // 查看模型概况
    mobilenet.summary();

    // 2.2 获取模型中间层并截断
    const layer = mobilenet.getLayer('conv_pw_13_relu'); // 根据层名获取层
    // 生成新的截断模型
    const truncatedMobilenet = tf.model({
        inputs: mobilenet.inputs,
        outputs: layer.output
    });

    // 3. 构建双层神经网络，tensor数据从 mobilenet 模型 flow 到 构建到双层神经网络模型
    // 初始化神经网络模型
    const model = tf.sequential();
    // flatten输入
    model.add(tf.layers.flatten({
        inputShape: layer.outputShape.slice(1) // [null,7,7,256] => [7,7,256]，null表示个数不定，此处删除
    }));
    // 双层神经网络
    model.add(tf.layers.dense({
        units: 10,
        activation: 'relu'
    }));
    model.add(tf.layers.dense({
        units: NUM_CLASSES, // 输出类别数量
        activation: 'softmax'
    }));

    // 4. 训练
    // 4.1 定义损失函数和优化器
    model.compile({
        loss: 'categoricalCrossentropy', // 交叉熵
        optimizer: tf.train.adam()
    });
    // 4.2 数据预处理: 处理输入为截断模型接受的数据格式，即 mobilenet 接受的格式
    const { xs, ys } = tf.tidy(() => {
        // img2x: img 转 mobilenet 接受的tensor格式，并合并单个 tensor 为一个大 tensor
        const xs = tf.concat(inputs.map(imgEl => truncatedMobilenet.predict(img2x(imgEl))));
        const ys = tf.tensor(labels);
        return { xs, ys };
    });
    // 4.3 通过 fit 方法训练
    await model.fit(xs, ys, {
        epochs: 20,
        callbacks: tfvis.show.fitCallbacks(
            { name: '训练效果' },
            ['loss'],
            { callbacks: ['onEpochEnd'] }
        )
    });

    // 5. 迁移学习下的模型预测
    window.predict = async (file) => {
        const img = await file2img(file);
        document.body.appendChild(img);
        const pred = tf.tidy(() => {
            // img 转 tensor
            const x = img2x(img);
            // 截断模型先执行
            const input = truncatedMobilenet.predict(x);
            // 再用新模型预测出最终结果
            return model.predict(input);
        });
        const index = pred.argMax(1).dataSync()[0];
        setTimeout(() => {
            alert(`预测结果：${BRAND_CLASSES[index]}`);
        }, 0);
    };
    
    // 6. 模型的保存 tfjs_layers_model
    // json + 权重bin
    window.download = async () => {
        await model.save('downloads://model');
    };
};