// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportPost from '../../../app/model/post';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Post: ReturnType<typeof ExportPost>;
    User: ReturnType<typeof ExportUser>;
  }
}
