/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-22 19:42:36
 * @Description: sunjianfeng@csxiaoyao.com
 */
import * as speechCommands from '@tensorflow-models/speech-commands';
import * as tfvis from '@tensorflow/tfjs-vis';

/**
 * 中文语音训练识别
 * 
 * 步骤：
 * 1. 浏览器中收集中文语音训练数据
 * 2. 使用 speech commands 包进行迁移学习并预测
 * 3. 语音训练数据的保存和加载
 */
const MODEL_PATH = 'http://127.0.0.1:8080';
// 迁移学习语音识别器
let transferRecognizer;

window.onload = async () => {
    // 创建语音识别器
    const recognizer = speechCommands.create(
        'BROWSER_FFT',
        null,
        MODEL_PATH + '/speech/model.json',
        MODEL_PATH + '/speech/metadata.json'
    );
    await recognizer.ensureModelLoaded();
    // 迁移学习语音识别器
    transferRecognizer = recognizer.createTransfer('轮播图');
};

// 收集语音素材
window.collect = async (btn) => {
    btn.disabled = true;
    const label = btn.innerText; // 上一张 / 下一张 / 背景噪音
    // collect
    await transferRecognizer.collectExample(
        label === '背景噪音' ? '_background_noise_' : label
    );
    btn.disabled = false;
    // 显示采集的素材数量，JSON.stringify 设置空两格
    document.querySelector('#count').innerHTML = JSON.stringify(transferRecognizer.countExamples(), null, 2);
};

// 训练
window.train = async () => {
    await transferRecognizer.train({
        epochs: 30,
        callback: tfvis.show.fitCallbacks(
            { name: '训练效果' },
            ['loss', 'acc'],
            { callbacks: ['onEpochEnd'] }
        )
    });
};

// 监听开关 
window.toggle = async (checked) => {
    if (checked) {
        await transferRecognizer.listen(result => {
            const { scores } = result;
            const labels = transferRecognizer.wordLabels();
            const index = scores.indexOf(Math.max(...scores));
            console.log(labels[index]);
        }, {
            overlapFactor: 0, // 识别频率 0 - 1
            probabilityThreshold: 0.75 // 可能性阈值
        });
    } else {
        // 停止监听
        transferRecognizer.stopListening();
    }
};

// 模型保存
window.save = () => {
    // arrayBuffer 为二进制数据
    const arrayBuffer = transferRecognizer.serializeExamples();
    // 二进制数据转换为 blob
    const blob = new Blob([arrayBuffer]);
    // 下载
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'data.bin';
    link.click();
};