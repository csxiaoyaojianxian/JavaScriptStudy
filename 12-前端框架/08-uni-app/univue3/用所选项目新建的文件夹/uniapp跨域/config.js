// 系统信息
export const SYSTEM_INFO = uni.getSystemInfoSync()


// 主机地址
export const HOST = 'https://tiyu.baidu.com';


// api服务器
export const API_HOST = SYSTEM_INFO.uniPlatform === 'web' ? '' : HOST;


// api服务代理路径
export const API_PROXY = SYSTEM_INFO.uniPlatform === 'web' ? '/h5api' : ''