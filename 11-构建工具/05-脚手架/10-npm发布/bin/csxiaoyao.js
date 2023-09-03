#!/usr/bin/env node

import { program } from 'commander';

program
  .version('1.0.0')
  .usage('<command> [csxiaoyao options]')
  .command('add', 'add a template')
  .command('delete', 'delete a template')
  .command('list', 'list all templates')
  .command('init', 'generate a new project from template')
  .parse(process.argv)