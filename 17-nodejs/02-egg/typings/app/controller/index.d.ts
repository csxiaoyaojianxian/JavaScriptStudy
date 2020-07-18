// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportIndex from '../../../app/controller/index';
import ExportTopics from '../../../app/controller/topics';

declare module 'egg' {
  interface IController {
    index: ExportIndex;
    topics: ExportTopics;
  }
}
