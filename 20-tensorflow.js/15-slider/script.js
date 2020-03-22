/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-22 20:00:55
 * @Description: sunjianfeng@csxiaoyao.com
 */
import * as speechCommands from '@tensorflow-models/speech-commands';

/**
 * 【 声控轮播图 】
 * 加载 14-speech-cn 采集的 data.bin
 */

const MODEL_PATH = 'http://127.0.0.1:8080';
let transferRecognizer;
let curIndex = 0; // 当前幻灯片索引

window.onload = async () => {
    const recognizer = speechCommands.create(
        'BROWSER_FFT',
        null,
        MODEL_PATH + '/speech/model.json',
        MODEL_PATH + '/speech/metadata.json',
    );
    await recognizer.ensureModelLoaded();
    // 创建迁移学习器实例
    transferRecognizer = recognizer.createTransfer('轮播图');
    // fetch data.bin 加载之前录制的训练语音数据
    const res = await fetch(MODEL_PATH + '/slider/data.bin');
    const arrayBuffer = await res.arrayBuffer();
    transferRecognizer.loadExamples(arrayBuffer);
    // 训练
    await transferRecognizer.train({ epochs: 30 });
    console.log('done');
};

// 预测监听开关
window.toggle = async (checked) => {
    if (checked) {
        await transferRecognizer.listen(result => {
            const { scores } = result;
            const labels = transferRecognizer.wordLabels();
            // 得到得分最高的label的索引
            const index = scores.indexOf(Math.max(...scores));
            window.play(labels[index]);
        }, {
            overlapFactor: 0,
            probabilityThreshold: 0.5
        });
    } else {
        transferRecognizer.stopListening();
    }
};

// 播放控制
window.play = (label) => {
    const div = document.querySelector('.slider>div');
    if (label === '上一张') {
        if (curIndex === 0) { return; }
        curIndex -= 1;
    } else {
        if (curIndex === document.querySelectorAll('img').length - 1) { return; }
        curIndex += 1;
    }
    div.style.transition = "transform 1s"
    div.style.transform = `translateX(-${100 * curIndex}%)`;
};