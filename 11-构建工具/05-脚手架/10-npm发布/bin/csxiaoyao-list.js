#!/usr/bin/env node
import chalk from 'chalk';

import { createRequire } from "module";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); // type=module时 __dirname 不可直接使用

const require = createRequire(import.meta.url);
const csxiaoyaoTpls = require(path.resolve(__dirname, '../csxiaoyao-template.json'));

csxiaoyaoTpls.forEach(v => {
  console.log(`模板名称: ${chalk.green(v.name)}, 模板地址: ${chalk.yellow(v.url)}`);
});