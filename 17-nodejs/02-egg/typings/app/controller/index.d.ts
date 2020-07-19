// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDemo from '../../../app/controller/demo';
import ExportPost from '../../../app/controller/post';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    demo: ExportDemo;
    post: ExportPost;
    user: ExportUser;
  }
}
