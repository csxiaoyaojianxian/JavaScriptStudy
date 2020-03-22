/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-22 18:03:26
 * @Description: sunjianfeng@csxiaoyao.com
 */
import * as speechCommands from '@tensorflow-models/speech-commands';

/**
 * 【 使用预训练模型进行语音识别 】
 * 语音识别的本质是分类
 * 
 * $ npm i @tensorflow-models/speech-commands
 */
const MODEL_PATH = 'http://127.0.0.1:8080/speech';

window.onload = async () => {
    // 创建识别器
    const recognizer = speechCommands.create(
        'BROWSER_FFT', // 语音识别需要用到傅立叶变换，此处使用浏览器自带的傅立叶
        null, // 识别的单词，null为默认单词
        MODEL_PATH + '/model.json', // 模型
        MODEL_PATH + '/metadata.json' // 自定义源信息
    );
    // 确保模型加载
    await recognizer.ensureModelLoaded();

    // 获取模型能够识别的单词
    const labels = recognizer.wordLabels().slice(2); // 去掉前两个无意义的单词
    console.log(labels);

    // 绘制交互界面
    const resultEl = document.querySelector('#result');
    resultEl.innerHTML = labels.map(l => `
        <div>${l}</div>
    `).join('');

    // 打开设备麦克风监听，可以不用编写 h5 代码
    recognizer.listen(result => {
        const { scores } = result;
        const maxValue = Math.max(...scores);
        const index = scores.indexOf(maxValue) - 2; // 去掉前两个无意义的单词
        resultEl.innerHTML = labels.map((l, i) => `
            <div style="background: ${i === index && 'green'}">${l}</div>
        `).join('');
    }, {
        overlapFactor: 0.3, // 识别频率
        probabilityThreshold: 0.9 // 识别阈值，超过指定的准确度即执行上面的回调
    });
};