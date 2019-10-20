/**
 * snapshot 快照测试
 * 每次需要更新配置文件的时候，需要按 u 更新全部快照，按 i 进入交互式单独更新
 */
import { generateConfig, generateConfig2 } from "./11-snapshot";

test("测试 generateConfig 函数", () => {
  expect(generateConfig()).toMatchSnapshot();
});

test("测试 generateConfig2 函数", () => {
  expect(generateConfig2()).toMatchSnapshot({
    // 用于匹配时间类变化的值
    time: expect.any(Date)
  });
});

/**
 * inline snapshot
 * 需要安装 prettier 模块
 * $ npm install prettier --save
 */
// test("测试 generateConfig2 函数 inline", () => {
//     expect(generateConfig2()).toMatchInlineSnapshot({
//         // 用于匹配时间类变化的值
//         time: expect.any(Date)
//     });
// });
test("测试 generateConfig2 函数 inline", () => {
  expect(generateConfig2()).toMatchInlineSnapshot(
    {
      // 用于匹配时间类变化的值
      time: expect.any(Date)
    },
    `
    Object {
      "port": 8080,
      "server": "http://localhost",
      "time": Any<Date>,
    }
  `
  );
});
