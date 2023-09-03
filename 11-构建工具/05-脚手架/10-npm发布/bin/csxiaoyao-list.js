#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { createRequire } from "module";
import chalk from 'chalk';

const require = createRequire(import.meta.url);
const __dirname = path.resolve(); // type=module 时不能直接使用 __dirname
const tpath = path.resolve(__dirname, './csxiaoyao-template.json');
const csxiaoyaoTpls = require(tpath);

csxiaoyaoTpls.forEach(v => {
  console.log(`模板名称: ${chalk.green(v.name)}, 模板地址: ${chalk.yellow(v.url)}`);
});