#!/usr/bin/env node

import chalk from 'chalk';

// const log = {
//   error(str) {
//     chalk.bold.red(str)
//   }
//   // your own themes
// }
const log = console.log;

// 文本颜色
log(chalk.bold.red('csxiaoyao.com'));
log(chalk.yellow('csxiaoyao.com'));
log(chalk.green('csxiaoyao.com'));
log(chalk.white('csxiaoyao.com'));
log(chalk.grey('csxiaoyao.com'));
log(chalk.hex('#DEADED').underline('Hello, world!'));
log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

// 背景色
log(chalk.bgRed('csxiaoyao.com'));
log(chalk.bgBlue('csxiaoyao.com'));
log(chalk.rgb(15, 100, 204).inverse('Hello!'))

// 模板字符串
log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`);

