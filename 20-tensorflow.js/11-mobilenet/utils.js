/*
 * @Author: victorsun
 * @Date: 2019-12-04 20:15:29
 * @LastEditors: victorsun - csxiaoyao
 * @LastEditTime: 2020-03-22 16:03:00
 * @Description: sunjianfeng@csxiaoyao.com
 */
export function file2img(f) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.width = 224; // 模型限制图片宽高为224
            img.height = 224;
            img.onload = () => resolve(img);
        };
    });
}